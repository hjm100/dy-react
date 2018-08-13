const user = {
    state: {
      name:"",   //用户名
    },
    mutations: {
      setName(state, name) {
        state.name = name;
      }
    }
  };
  
  export default user;
  