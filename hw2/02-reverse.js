/** Exercise 02 - Reverse **/

// Add your code here
const reverseNumber = () => {
    let inputNum = document.querySelector("#input").value;
    const output = document.createElement("p");
    const divElement = document.getElementById("reverse");
    if (inputNum.length === 8)
    {
        let reversedNumber = inputNum.split("").reverse().join("");   
        output.textContent = `${inputNum} --> ${reversedNumber}`;
    }
    else{
        output.textContent = "Please input an 8 digit number";
    }
   divElement.append(output);
    return;
};
