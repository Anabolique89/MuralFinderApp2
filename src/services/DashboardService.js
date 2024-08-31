import axios from 'axios';
import { BASE_URL, dashboardEndpoints } from '../constants/ApiEndpoints';


const DashboardService = {

    getDashboardData: async () => {
        try {
            const response = await axios.get(`${BASE_URL}${dashboardEndpoints.getDashboardData}`);
            return response.data.data;
        
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw new Error('Failed to fetch dashboard data');
        }
    },


}

export default DashboardService