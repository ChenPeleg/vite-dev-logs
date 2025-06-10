const testButton = document.getElementById("testLog");

testButton?.addEventListener("click", async () => {
  try {
    const response = await fetch("/dev-logger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        message: "Test log message",
        level: "info",
        data: {
          test: true,
          random: Math.random(),
        },
      }),
    });

    if (response.ok) {
      console.log("Log sent successfully!");
    } else {
      console.error("Failed to send log");
    }
  } catch (error) {
    console.error("Error sending log:", error);
  }
});
