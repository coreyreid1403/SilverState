export default class BaseService {
  reruns: number = 3;
  /**
   * Wrapper to rerun db calls 3 times
   * @returns
   */
  public wrap(f) {
    return async  (...args) => {
      let retry = 0;
      while(retry < this.reruns){
        try{
          const res = await f.apply(args);
        const posts = await res.json();
        if (res.status !== 200 || posts.error.length !== 0) {
          retry++;
          if(retry < this.reruns){
            return res;
          }
          console.error('Retrying');
        }
        else{
          console.log('Complete');
          return res;
        }
        }
        catch(e: any){
          retry++;
          if(retry < this.reruns){
            throw e;
          }
        }
      }
    };
  }
}
