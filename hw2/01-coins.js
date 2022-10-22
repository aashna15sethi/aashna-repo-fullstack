/** Exercise 01 - Coins **/

const calculateChange = (input) => {
  let returnAmt = input
  if (returnAmt > 10){
      console.log("amount larger than $10")
  }
  else{
      let dollarAmt = 0
      let quarterAmt = 0
      let quarters = 0
      let dimeAmt = 0
      let dimes = 0
      let remainingAmt = 0
      let nickelAmt = 0
      let nickels = 0
      let pennyAmt = 0
      let pennies = 0

      dollarAmt = (returnAmt / 1)
      console.log(Math.floor(dollarAmt), " dollars,")
      returnAmt -= dollarAmt

      if (dollarAmt > 0)
      {
          remainingAmt = Math.abs(dollarAmt) - Math.floor(dollarAmt)
          quarterAmt = (remainingAmt/0.25)   
          quarters = Math.floor(quarterAmt)
          console.log(quarters, " quarters")
      }
      else{
          quarters = 0
          console.log(quarters, " quarters")
      }

      if(remainingAmt > 0){
          dimeAmt = ((remainingAmt - (quarters*0.25))/0.10)
          dimes = Math.floor(dimeAmt)
          remainingAmt = Math.abs(dimeAmt) - Math.floor(dimeAmt)
          console.log(dimes, " dimes")
          //console.log("rem amt", remainingAmt)
      }
      else{
          dimes = 0
          console.log(dimes, " dimes")
      }

      if(remainingAmt > 10){
          nickelAmt = ((remainingAmt - (dimes*0.10))/0.05)
          nickels = Math.floor(nickelAmt)
          remainingAmt = Math.abs(nickelAmt) - Math.floor(nickelAmt)
          console.log(nickels, " nickels")
          //console.log("rem amt", remainingAmt)
      }
      else{
          nickels = 0
          console.log(nickels, " nickels")
      }

      
  }
};


// Sample Test Cases
console.log(calculateChange(4.62))
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74))
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16))
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11))
// $15.11 ==> Error: the number is too large
