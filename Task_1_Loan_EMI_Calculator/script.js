function calculateEMI() {

    const principal = Number(document.getElementById("principal").value);
    const annualRate = Number(document.getElementById("interest").value);
    const years = Number(document.getElementById("tenure").value);

    if (principal <= 0 || annualRate < 0 || years <= 0) {
        document.getElementById("result").innerHTML =
            "Please enter valid values.";
        return;
    }

    // Convert annual interest rate into monthly rate
    const R = annualRate / 12 / 100;

    // Convert years into months
    const N = years * 12;

    let emi;

    if (R === 0) {
        emi = principal / N;
    } else {
        emi = (principal * R * Math.pow(1 + R, N)) /
              (Math.pow(1 + R, N) - 1);
    }

    document.getElementById("result").innerHTML =
        `Your Monthly EMI is ₹${emi.toFixed(2)}`;
}