function myfunction() {
  const mlb = document.getElementById("mlb").value;
  const titulo = document.getElementById("titulo");
  const price = document.getElementById("price")
  const anuncio = document.getElementById('anuncio')
  const estoque = document.getElementById('estoque')
  const seller_id = document.getElementById("seller_id");
  const fabricante = document.getElementById("fabricante")
  const frete = document.getElementById("frete")
  const txml = document.getElementById("txml")
  const b = "Abacate"
  const url = `https://api.mercadolibre.com/items/${mlb}`;
  const headers = {
    "Content-Type": "application/json"
  };

  fetch(url, { method: "GET", headers })
    .then(response => response.json())
    .then(response => {
      titulo.textContent = response.title //Pega o título do anúncio
      // seller_id.textContent = response.seller_id //descobre o ID do vendedor do anúncio
      price.textContent = response.price //Pega o preço do anúncio
       if(response.listing_type_id=="gold_special"){ //verifica se o anúncio é premium ou clássico
      anuncio.textContent ="Clássico"
      }
      else{
        anuncio.textContent ="Premium"
      }    
      const foto = document.getElementById("foto").src =`${response.secure_thumbnail}` //adiciona a foto no HTML
      estoque.textContent = response.sold_quantity //Quantidade vendida desse produto
      fabricante.textContent = response.attributes[1].value_name    
      
      const urlTaxa = `https://api.mercadolibre.com/sites/MLB/listing_prices?price=${response.price}&category_id=${response.category_id}`
      fetch(urlTaxa,{method: "GET", headers})
      .then(result => result.json())
      .then(result =>{
        txml.textContent = result[2].sale_fee_amount //Taxa do Mercado Livre
      })
      .catch(error => console.log("error",error)) //Descobrir taxa do anúncio

      const vendedor = `https://api.mercadolibre.com/users/${response.seller_id}`
      fetch(vendedor,{method: "GET", headers})
      .then(resVendedor => resVendedor.json())
      .then(resVendedor =>{
        seller_id.textContent = resVendedor.nickname
      })
        
      // console.log(response)


    })
    .catch(error => console.log("error", error));
}