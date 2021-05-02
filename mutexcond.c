/* -*- linux-c -*-  */

#include <stdlib.h>
#include <mqueue.h>
#include <stdio.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <pthread.h>

#define TRACE 1

#define BUFSIZE     100
#define MAXFILENAME 128
#define ENDOFDATA   -1 /* marks the end of data stream from producer */

/*
   Bounded buffer has a queue of items. It is a FIFO queue.  There can
   be at most BUFSIZE items. Below we have structures related to the
   queue and buffer.
*/

struct bb_qelem {
        struct bb_qelem *next;
        int data;  /* an item - an integer */
};


struct bb_queue {
        struct bb_qelem *head;
        struct bb_qelem *tail;
	int count; /* number of items in the buffer */
};


void
bb_queue_init(struct bb_queue *q)
{
        q->count = 0;
        q->head = NULL;
        q->tail = NULL;
}


// this function assumes that space for item is already allocated
void
bb_queue_insert(struct bb_queue *q, struct bb_qelem *qe)
{

        if (q->count == 0) {
                q->head = qe;
                q->tail = qe;
        } else {
                q->tail->next = qe;
                q->tail = qe;
        }

        q->count++;
}

// this function does not free the item
// it is deleting the item from the list 
struct bb_qelem *
bb_queue_retrieve(struct bb_queue *q)
{
        struct bb_qelem *qe;

        if (q->count == 0)
                return NULL;

        qe = q->head;
        q->head = q->head->next;
        q->count--;

        return (qe);
}




/*******************************************************
 Below is shared object and its two operations.
 *******************************************************/

// This is the shared object
struct bounded_buffer {
        struct bb_queue *q;               /* bounded buffer queue  */
        pthread_mutex_t th_mutex_queue;   /* mutex  to protect queue */
        pthread_cond_t  th_cond_hasspace;  /* will cause producer to wait */
        pthread_cond_t  th_cond_hasitem;   /* will cause consumer to wait */
};
// It will have two operations: bb_add and bb_rem

void
bb_add(struct  bounded_buffer* bbp, struct bb_qelem *qep)
{
	pthread_mutex_lock(&bbp->th_mutex_queue);
		
	/* critical section begin */
	while (bbp->q->count == BUFSIZE)
		pthread_cond_wait(&bbp->th_cond_hasspace,
				  &bbp->th_mutex_queue);

	bb_queue_insert(bbp->q, qep); //

	if (TRACE) {
		printf ("producer insert item = %d\n", qep->data);
		fflush (stdout);
	}
		
	if (bbp->q->count == 1)
		pthread_cond_signal(&bbp->th_cond_hasitem);

	/* critical section end */
	pthread_mutex_unlock(&bbp->th_mutex_queue);
}


struct bb_qelem *
bb_rem (struct bounded_buffer *bbp)
{
	struct bb_qelem *qe;
	
	pthread_mutex_lock(&bbp->th_mutex_queue);

	/* critical section begin */
	
	while (bbp->q->count == 0) {
		pthread_cond_wait(&bbp->th_cond_hasitem,
				  &bbp->th_mutex_queue);
	}

	qe = bb_queue_retrieve(bbp->q);
	
	if (qe == NULL) {
		printf("can not retrieve; should not happen\n");
		exit(1);
	}
	
	if (TRACE) {
		printf ("consumer retrieved item = %d\n", qe->data);
		fflush (stdout);
	}
	
	if (bbp->q->count == (BUFSIZE - 1))
		pthread_cond_signal(&bbp->th_cond_hasspace);
	
	/* critical section end */
	
	pthread_mutex_unlock(&bbp->th_mutex_queue);
	return (qe); 
}

/*******************************************************
          end shared object data and functions
 *******************************************************/




/*********** GLOBAL VARIABLE ******************************************/
char infilename[MAXFILENAME];
char outfilename[MAXFILENAME];

struct bounded_buffer *bbuffer;  /* bounded buffer pointer */
/**********************************************************************/



/* producer thread start function */
void *
producer (void * arg)
{
	FILE *fp; 
	int number; 
	struct bb_qelem *qe; 

	fp = fopen (infilename, "r"); 

	while ( fscanf (fp, "%d", &number) == 1) {
		/*  insert item into buffer */

		qe = (struct bb_qelem *) malloc (sizeof (struct bb_qelem)); 
		if (qe == NULL) {
			perror ("malloc failed\n"); 
			exit (1); 
		}
		qe->next = NULL; 
		qe->data = number; 

		bb_add (bbuffer, qe); // one thread at a time
	}

	fclose (fp); 


	/* put and end-of-data marker to the queue */
	qe = (struct bb_qelem *) malloc (sizeof (struct bb_qelem));
	if (qe == NULL) {
		perror ("malloc failed\n");
		exit (1);
	}
	qe->next = NULL;
	qe->data = ENDOFDATA;

	bb_add (bbuffer, qe);  // one thread at a time

	printf ("producer terminating\n");  fflush (stdout); 

	pthread_exit (NULL); 
}



/* consumer thread start function */
void *
consumer (void * arg)
{
	FILE *fp; 
	struct bb_qelem *qe; 

	fp = fopen (outfilename, "w"); 
	
	while (1) {
        
		qe = bb_rem (bbuffer); // one thread at a time
		
		if (qe->data != ENDOFDATA) {
			fprintf (fp, "%d\n", qe->data); 
			fflush (fp); 
			free (qe); 
		}
		else {
		    free (qe); // deallocating memory that was allocated
			break; 
		}
	}

	fclose (fp); 
	
	printf ("consumer terminating\n"); fflush (stdout); 
       	pthread_exit (NULL); 
}




int 
main(int argc, char **argv)
{

	pthread_t prodtid, constid; 
	int ret; 


	if (argc != 3) {
		printf ("usage: mutexcond <infile> <outfile>\n"); 
		exit (1); 
	}
			
	strcpy(infilename, argv[1]);
	strcpy(outfilename, argv[2]); 


	/* init buffer and mutex/condition variables  */
	bbuffer =  
		(struct bounded_buffer *) malloc(sizeof (struct bounded_buffer));
	bbuffer->q = (struct bb_queue *) malloc(sizeof (struct bb_queue));
	bb_queue_init(bbuffer->q);
	pthread_mutex_init(&bbuffer->th_mutex_queue, NULL);
	pthread_cond_init(&bbuffer->th_cond_hasspace, NULL);
	pthread_cond_init(&bbuffer->th_cond_hasitem, NULL);


	ret = pthread_create (&prodtid, NULL,
				  producer, NULL); 
	if (ret != 0) {
		perror ("thread create failed\n"); 
		exit (1); 
	}
	
    
	ret = pthread_create (&constid, NULL, 
				  consumer, NULL); 
	if (ret != 0) {
		perror ("thread create failed\n"); 
		exit (1); 
	}


	/* wait for threads to terminate */
	pthread_join (prodtid, NULL); 
	pthread_join (constid, NULL);


	/* destroy buffer and mutex/condition variables */
	free(bbuffer->q);
	free(bbuffer);
	
	pthread_mutex_destroy(&bbuffer->th_mutex_queue);
	pthread_cond_destroy(&bbuffer->th_cond_hasspace);
	pthread_cond_destroy(&bbuffer->th_cond_hasitem);

	printf ("closing...\n"); 
	return 0; 
}
