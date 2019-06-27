export const redirectToLogin=(props)=>{
    if(!localStorage.getItem("token")){
        props.history.push("/login");
    }
};