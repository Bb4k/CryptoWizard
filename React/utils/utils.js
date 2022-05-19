import axios from "axios";

export function filterBy(arr, attribute) {
    var f = [];
    return arr.filter(function(n) {
      return f.indexOf(n[attribute]) == -1 && f.push(n[attribute])
    });
  }

export function createInvestmentCard(investment, API_URL) {
    return (axios({
        method: "get",
        url: `${API_URL}/token/${investment.investment_sym}`,
    })
        .then((response) => {
            return ({
                id: response.data.token_id,
                image: response.data.token_img,
                name: response.data.token_sym,
                profit: investment.investment_tokens * response.data.token_next_price - investment.investment_init_value
            });
        })
        .catch((response) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response token-data: ", response);
            }
        }));
}

export function createFollowCard(follow, API_URL) {
    return (axios({
        method: "get",
        url: `${API_URL}/token/${follow.follow_token_sym}`,
    })
        .then((responseToken) => {
            if (responseToken.data)
                return ({
                    id: responseToken.data.token_id,
                    image: responseToken.data.token_img,
                    name: responseToken.data.token_sym,
                    profit: responseToken.data.token_next_price
                });
        })
        .catch((responseToken) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response token-follow: ", responseToken);
            }
        }));
}

export function getPrices(token, API_URL) {
    return (axios({
        method: "get",
        url: `${API_URL}/price/${token}`,
    })
        .then((response) => {
            return (response.data);
        })
        .catch((response) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response token-data: ", response);
            }
        }));
}

export function getPlans(API_URL) {
    return (axios({
        method: "get",
        url: `${API_URL}/plan-list`,
    })
        .then((response) => {
            return (response.data);
        })
        .catch((response) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response plans-data: ", response);
            }
        }));
}

