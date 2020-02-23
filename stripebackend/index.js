const cors=require("cors")

const express=require("express")
const stripe=require("stripe")("sk_test_QIUOfxngptS37BHnBqF99DPF00igTSr9j8")
const uuid=require("uuid/v4")


const app=express(); 




//middleware
app.use(express.json())
app.use(cors())

app.get("/check",(req,res)=>{
    res.send("its workingh")
})



app.post("/payment",(req,res)=>{

    const {product,token}=req.body;
    console.log("product",product);
    console.log("price",product.price)
    const iden=uuid()


    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer=>{
        stripe.charges.create({
           amount:product.price*100,
           currency:"usd",
           customer:customer.id,
        //    receipt_email:token.email,
        //    description:  `purcase of product.name `,

        //    shipping:{
        //      name:token.card.name,
        //      address:{
        //          country:token.card.address_country
        //      }

        //    }


        },{iden})
    })
    .then(result=> res.status(200).json(result))
    .catch(err=>console.log(err))


})

//listen
app.listen(8282,()=>console.log("listening"))







