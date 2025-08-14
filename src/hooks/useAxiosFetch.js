import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataURL) => {
    const [data, setData] = useState([]);
    const[fetchError, setFetchError] = useState(null);
    const[isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try{
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }

            } catch(err) {
                if (isMounted) {
                    setFetchError(err.Message);
                    setData([]);
                }
                
            } finally {
                isMounted && setIsLoading(false);
            }
        }
        
        fetchData(dataURL);

        const cleanUp = () => {
             isMounted = false;
             source.cancel();
        }

        return cleanUp;
    }, [dataURL]);

    return { data, fetchError, isLoading };

}

export default useAxiosFetch;