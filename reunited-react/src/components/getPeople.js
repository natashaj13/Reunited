export const getPeople = async (type = '', query = '') => {
    const searchParams = new URLSearchParams({ type, query });
    const requestUrl = `/people?${searchParams.toString()}`;
  
    const response = await fetch(requestUrl, {
      method: 'GET'
    });
  
    const json = await response.json();
  
    return json;
  };
  
  export const getDetails = async (id) => {
    const requestUrl = `/people/${id}`;
    const response = await fetch(requestUrl, {
      method: 'GET'
    });
  
    const json = await response.json();
  
    return json;
  };
  
  export const getName = async () => {
    const requestUrl = `/types`;
    const response = await fetch(requestUrl, {
      method: 'GET'
    });
  
    const json = await response.json();
  
    return json;
  };