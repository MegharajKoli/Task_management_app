import Task from'../models/Task';

export default class taskServices{
    

    async createNewTask(taskBody:any){
        const task=new Task(taskBody);
        await task.save();

    }

   async delete(taskId: string) {
        await Task.findByIdAndDelete(taskId);
    }

    async update(taskId: string, updates: any) {
        const task = await Task.findById(taskId);
        
        if (!task) {
            throw new Error("Task not found");   
        }

        task.status = updates.status || task.status;
        task.title   = updates.title   || task.title;

        await task.save();


        return task;   
    }

    async fetchAllTask(){
        return await Task.find();
    }
}