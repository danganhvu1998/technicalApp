  async testing(){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };
    let url = "http://localhost:8000/api/data";
    let data = { info : "6298" };
    console.log("JSON POST:");
    let response = await this.http.post(url, data, options).toPromise();
    console.log(response);
  }