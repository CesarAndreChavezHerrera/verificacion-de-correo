
async function verificarEstructura() {
    // Obtener valores de los campos
    const apiKey = document.getElementById("apiKey").value;
    const subject = document.getElementById("subject").value;
    const body = document.getElementById("body").value;

    // Validación inicial
    if (!apiKey || !subject || !body) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Preparar la petición para OpenAI
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Eres un asistente que revisa la estructura de correos electrónicos." },
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
