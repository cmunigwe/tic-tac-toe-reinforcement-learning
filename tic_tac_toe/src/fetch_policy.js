async function fetchPolicyJSON() {

    const response = await fetch('http://localhost:3000');
    const policy = await response.json();
    return policy;
  }
  let result 
  fetchPolicyJSON().then(policy => {
    //policy // fetched policy
  });  