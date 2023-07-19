function sum(n){
    //first term of nth row
    let t=1;
    for(let i=1; i<=n; i++){
        
        t = t + 2*(i-1);
        console.log(t);
    }

    //terms of the nth row
    let joint=t-2;
    let total = t;
    
    for(let i=1; i<n; i++){
        
        joint = joint+2;
        console.log("terms" + joint);
       total=total+2 + joint;
       console.log(total);
    }
     
}
sum(5);