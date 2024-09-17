# Bull Dashboard Queue States

In the context of using Bull with the Bull Dashboard, here's how the queue states are defined:

## Queue States

### **1. Waiting:**

A job is in the **"Waiting"** state when it has been added to the queue but has not yet started processing. This means it is waiting for a worker to pick it up and start executing it.

### **2. Active:**

A job is in the **"Active"** state when a worker has picked it up and is currently processing it. This means the job is being executed, and it is in the process of completing its task.

### **3. Completed:**

A job is considered successful (or **"Completed"**) when it has finished processing without any errors. This means the job's processing function has returned successfully, and the job has been marked as completed in the queue.

### **4. Failed:**

A job is marked as **"Failed"** when an error occurs during its processing. This can happen if:

- The job throws an error.
- The job exceeds the maximum number of retries (if configured).
- The job is manually failed using the Bull API.

When a job fails, it will not be retried unless you have configured retry logic.
