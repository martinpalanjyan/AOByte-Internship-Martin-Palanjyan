//Implement your own Promise library

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(func) {
    this.state = PENDING;
    this.result = undefined;
    this.FulFFunc = [];
    this.RejFunc = [];

    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.result = value;
        this.FulFFunc.forEach((f) => f(value));
      }
    };

    const reject = (error) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.result = error;
        this.RejFunc.forEach((f) => f(error));
      }
    };

    try {
      func(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(FulF, Rej) {
    return new MyPromise((resolve, reject) => {
      if (this.state === PENDING) {
        if (FulF) {
          this.FulFFunc.push(() => {
            try {
              const res = FulF(this.result);
              if (res instanceof MyPromise) {
                res.then(resolve, reject);
              } else {
                resolve(res);
              }
            } catch (error) {
              reject(error);
            }
          });
        }
        if (Rej) {
          this.RejFunc.push(() => {
            try {
              const res = Rej(this.result);
              if (res instanceof MyPromise) {
                res.then(resolve, reject);
              } else {
                reject(res);
              }
            } catch (error) {
              reject(error);
            }
          });
        }
      }
      if (FulF && this.state === FULFILLED) {
        FulF(() => {
          try {
            const res = FulF(this.result);
            if (res instanceof MyPromise) {
              res.then(resolve, reject);
            } else {
              resolve(res);
            }
          } catch (error) {
            reject(error);
          }
        });
        return;
      }
      if (Rej && this.state === REJECTED) {
        try {
          const res = Rej(this.result);
          if (res instanceof MyPromise) {
            res.then(resolve, reject);
          } else {
            reject(res);
          }
        } catch (error) {
          reject(error);
        }
        return;
      }
    });
  }

  catch(Rej) {
    return this.then(null, Rej);
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let completedCount = 0;

      const handleCompletion = (index, value) => {
        results[index] = value;
        completedCount++;

        if (completedCount === promises.length) {
          resolve(results);
        }
      };

      promises.forEach((promise, index) => {
        promise.then((value) => {
          handleCompletion(index, value);
        }).catch((error) => {
          reject(error);
        });
      });
    });
  }
}

//Create ajax method which, uses XMLHttpRequest under the hood, but returns a promise
//It should accept two parameters url – remote service endpoint ,config – possible configs described further


function ajax(url, config = {}){
    return new MyPromise((resolve,reject) => {
        const xhrV = new XMLHttpRequest();
        if(config.method){
        xhrV.open(config.method,url);
        }else{
            xhrV.open("GET",url);
        }
        if(config.headers){
            for(let h in config.headers){
                xhrV.setRequestHeader(h,config.headers[h]);
            }
        }
        xhrV.onload = () => {
            if(xhrV.status>= 200 && xhrV.status<400){
                resolve(xhrV.response);
            }else{
                reject(xhrV.status);
            }
        }
        xhrV.onerror = ()=> {
            reject(console.log("Error"));
        }
        xhrV.send(config.body);
    })
}

//Possible cases


// const p1 = ajax(url, {
//     type: "GET", // by default
//     headers: {} ,// by default
//     data: {}
//   }).then(() => {}).catch(() => {})

//   const p2 = ajax(url, {
//     type: "GET" ,// by default
//     headers: {} ,// by default
//     data: {}
//   }).then(() => {}).then(() => {}).catch(() => {})

//   const p3 = ajax(url, {
//     type: "GET",// by default
//     headers: {}, //by default
//     data: {}
//   }).catch(() => {}).then(() => {}).then(() => {})
  
  
//   MyPromise.all(p1, p2, p3).catch(() => {}).then(([]) => {}).then(() => {});
//   MyPromise.all([p1, p2, p3]).catch(() => {}).then(() => {}).then(() => {});


