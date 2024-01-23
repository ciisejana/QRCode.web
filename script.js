let link = document.getElementById("link");
let generate = document.getElementById("generate");
let output = document.getElementById("output");
let download = document.getElementById("download");
let box = document.querySelector(".box");
let output_contian = document.querySelector(".output_contianer");


generate.addEventListener("click", ()=>{
    let url = link.value;
    fetch(
        'https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=150x150'
    ).then((value) => {
        output_contian.style.display = "flex";
        box.style.height = "300px";
        output.src = value.url;

        // Now Enabling Download Button

        download.addEventListener("click", qr_code);
    });
});

const qr_code = ()=>{
    const toDataurl = async(url)=>{
        const blob = await fetch(url).then((resp)=>resp.blob());
        return URL.createObjectURL(blob);
    }

    (async function(){
        let url = link.value;
        let a = document.createElement("a");
        a.download = "qrcode/*";
        a.href = await toDataurl(
            'https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=150x150'
        );
        document.body.append(a);
        a.click();
    })();
};