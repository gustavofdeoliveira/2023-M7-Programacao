import axios from 'axios';
import  {Task}  from '../../interfaces';
const API_URL = 'http://localhost:3001/task'


export const createTask = async (task : Task, token: string): Promise<Task> => {
    const response = await axios.post(`${API_URL}/createTask`, 
    {
        "id": task.id,
        "title": task.title,
        "dir": task.dir,
        "description": task.description,
        "date": task.date,
        "completed": task.completed,
        "important": task.important,
        
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const getTasks = async (token: string) => {
    try{
    const response = await axios.get(`${API_URL}/getTasks`, 
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
    return response.data;
}catch(error){
    console.log(error);}
}

export const deleteAllTask = async (token: string) => {
    
    const response = await axios.delete(`${API_URL}/deleteAll`, 
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const updateTask = async (task: Task, token: string) => {
    const response = await axios.put(`${API_URL}/updateTask`, 
    {
            "id": task.id,
            "title": task.title,
            "dir": task.dir,
            "description": task.description,
            "date": task.date,
            "completed": task.completed,
            "important": task.important,
        
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export const deleteTask = async (id: string, token: string) => {
    const response = await axios.delete(`${API_URL}/deleteTask`, 
    {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            "id": id,
        }
    });
    return response.data;
}

export const importTask = async (id: string, important: boolean, token: string) => {
    const response = await axios.patch(`${API_URL}/importTask`, 
    {
        "id": id,
        "important": important,
    
}, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
    return response.data;
}

export const completedTask = async (id: string, completed: boolean, token: string) => {
    const response = await axios.patch(`${API_URL}/completedTask`, 
    {
        "id": id,
        "completed": completed,
    
}, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
    return response.data;
}
