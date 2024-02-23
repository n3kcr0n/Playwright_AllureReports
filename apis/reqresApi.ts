import { APIRequestContext } from "@playwright/test";


export default class ReqresApi{
    createUser_POST = async(request:APIRequestContext,firstName:string,email:string,password:string)=>{
        return await request.post(process.env.REQRES_BASEURL+'/users/',{
            data:{
                "username":firstName,
                "email":email,
                "password":password
            }
        });
    }

    deleteUser_DELETE = async(request:APIRequestContext,id:number)=>{
        return await request.delete(process.env.REQRES_BASEURL+`/users/${id}`);
    }

    updateUser_PUT = async(request:APIRequestContext,id:number,update:string)=>{
        return await request.put(process.env.REQRES_BASEURL+`/users/${id}`,{
            data:{
                "updatedAt": update
            }
        });
    }

    getUser_GET = async(request:APIRequestContext,page:number,perPage:number)=>{
        return await request.get(process.env.REQRES_BASEURL+"/users?",{
            params:{
                page: page,
                per_page: perPage
            }
        });
    }

}