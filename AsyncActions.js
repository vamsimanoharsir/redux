const redux=require('redux')
const createStore=redux.createStore
const axios=require('axios')
const applyMiddleware=redux.applyMiddleware
const thunkMiddleware=require('redux-thunk').default //without default keyword we will get an error

const fetch_req='fetch request'
const fetch_suc='fetch success'
const  fetch_fail='fetch failed'

const initialstate={
    loading:false,
    data:[],
    error:''
}

const fetch_req1=()=>{
    return{
        type:fetch_req
    }
}
const fetch_suc1=(users)=>{
    return{
        type:fetch_suc,
        payload:users
    }
}
const fetch_fail1=(error)=>{
    return{
        type:fetch_fail,
        payload:error
    }
}

//with redux-thunk action creator(function) can take an action obj and also function 
const fetchUsers = () => {  //returns a function that takes dispatch method as an argument
    return function (dispatch) {
      dispatch(fetch_req1())
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(data => {
          // response.data is the users
          dispatch(fetch_suc1(data.data))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(fetch_fail1(error.message))
        })
    }
  }

const reducer=(state=initialstate,action)=>{
    switch(action.type){
        case fetch_req:return{
            ...state, data:[]
        }
        case fetch_suc:return{
            ...state, loading:false, data:action.payload, error:''
        }
        case fetch_fail:return{
            ...state, loading:false, data:[], error:action.payload
        }
    }
}

const store=createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())