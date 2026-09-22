fetch("https://dummyjson.com/products")
  .then(response=>response.json())
  .then(data=>{
    data.products.slice(0,10).forEach(product=>{
      console.log(product.title);
    });

  })
  .catch(error=>{
    console.log("ERROR:",error);
  });
