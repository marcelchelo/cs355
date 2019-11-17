(async () => {
  let res = await fetch("localhost:3000/colleges");
  let test = res.json();
  console.log(test);
})();
