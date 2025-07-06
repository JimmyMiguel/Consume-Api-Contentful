function worksEl(arrayWork) {
  const works = document.querySelector("#worksEl");
  const dondeInsertanProductos = document.querySelector(".templete__works");
  dondeInsertanProductos.innerHTML = "";
  console.log();

  const trabajo = arrayWork.items;

  for (const x of trabajo) {
    // clono el contenido del template
    const clon = works.content.cloneNode(true);
    ///empiezo a colocar cada resultado de la api con mi templete
    const imagen = clon.querySelector(".works > div > img");
    const h2 = clon.querySelector(".works h2");
    const p = clon.querySelector(".works p");
    const link = clon.querySelector(".works a");

    /// para consumir la imagen necesito su id y su url
    const imageId = x.fields.imageWork.sys.id;

    // ahora busco el link que corresponda al id, el incluides es para guardar las imagenes el url, pero en item se guarda el id

    // imagen
    const asset = arrayWork.includes.Asset.find((a) => a.sys.id === imageId);
    const imageUrl = "https:" + asset.fields.file.url;
    imagen.src = imageUrl;
    // imagen

    // h2
    h2.textContent = x.fields.title;
    // p

    p.textContent = x.fields.descriptionWork;
    //a

    const linkWork = x.fields.link.content[0].content[0].value;
    link.href = linkWork;

    dondeInsertanProductos.appendChild(clon);
  }
}

function main() {
  fetch(
    "https://preview.contentful.com/spaces/ijty4i0htq9n/environments/master/entries?access_token=BD8FFYm6ud3nT2EhJZ2olOjJlW7vLe7HxHxWjsdeP8M"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    /// aqui voy a consumir la app y ponerla en template
    .then((data) => {
      console.log(data);

      // agrego la funcion que me recorre el array y me asigna a mi template
      return worksEl(data);
    })

    .catch((error) => {
      console.error("Error al obtener datos:", error);
    });
}

main();
