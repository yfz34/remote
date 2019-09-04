import * as youtubeSearch from "youtube-search";

var opts = {
  // maxResults: 50,
  key: 'AIzaSyDakVSaMTAbKjURb_6kOnPCuS8t-t9kFKk'
  // key:'AIzaSyCT5YNj0WpEUrt_4K8b3GZ6NoBZTOImXMA'
};

export function yTSearch(){
  return( dispatch, getStore )=> {
    let value=getStore().songlistReducer.input
    console.log(value)
    youtubeSearch(value, opts, (err, results) => {
      if(err) return console.log(err);
      console.dir(results);

      var handleData = results.filter(function(item, index, array){
        return item.kind !== "youtube#channel";
      });
      console.log("處理結果:",handleData)

      dispatch({
          type: 'SEARCH_YT_API',
          payload: {
            obj:handleData
          }
      })
    });
  }
}

export function inputTerm(evt) {
    return(dispatch)=> {
        dispatch({
            type: 'inputTerm',
            payload: {
              term:evt.target.value
            }
        })
    }
}

export function handleItem(item) {
  return(dispatch)=> {
    dispatch({
      type: 'CHOOSE_ITEM',
      payload: {
        item:item
      }
    })
  }
}

export function closeModal() {
  return(dispatch)=> {
    dispatch({
      type: 'CLOSE_MODAL',
    })
  }
}