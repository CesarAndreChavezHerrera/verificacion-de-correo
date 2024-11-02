



async function verificarEstructura() {
    // Obtener valores de los campos
    const apiKey = document.getElementById("apiKey").value;
    const subject = document.getElementById("subject").value;
    const body = document.getElementById("body").value;

    const model = document.getElementById("model").value;
    const lenguaje = document.getElementById("lan").value;
    const subjectRules = document.getElementById("subjectRules").value;
    const bodyRules = document.getElementById("bodyRules").value;

    const rule = `
    Eres un asistente que revisa la estructura de correos electrónicos. \n
    Verificar que los correos sigan la siguiente reglas para el subject: "${subjectRules}" fin de las reglas del subject\n
    Verificar que los correos sigan las siguientes reglas para el cuerpo: "${bodyRules}" fin de kas reglas del body\n

    y al no complir las reglas quiero que señales por punto los errores y puntos a mejorar en formato de lista dejando un salto de linea de por medio sin citar las reglas de cuerpo.

    y proporciona un analisis brebe de como mejorar la redaccion 

    y quiero que la respuesta me la escribas en ${lenguaje}
    `;

    // Validación inicial
    if (!apiKey || !subject || !body) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Preparar la petición para OpenAI
    try {
        alert("Analizando... wait a second");
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: rule },
                    { role: "user", content: `Revisa si el siguiente correo tiene una estructura adecuada.\n\nAsunto: ${subject}\n\nCuerpo:\n${body}` }
                ]
            })
        });

        // Procesar la respuesta de OpenAI
        const data = await response.json();
        const result = data.choices[0].message.content;

        // Mostrar el resultado en la página
        const resultDiv = document.getElementById("result");
        resultDiv.style.display = "block";
        resultDiv.innerText = result;

    } catch (error) {
        console.error("Error al verificar la estructura:", error);
        alert("Ocurrió un error al verificar la estructura del correo.");
    }
}
