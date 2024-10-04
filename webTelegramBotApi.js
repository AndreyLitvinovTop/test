export class WebTelegramBot{
    constructor(API){
        this.api = API; // API key telegram bot
        this.getUrlBot = String(`https://api.telegram.org/bot${API}`);
    }

    GetUpdate(){
        GetUpdates(this.getUrlBot);
    }
}


function GetUpdates(url){
    let offset = 0; 

    function getNewMessages() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `${url}/getUpdates?offset=${offset}&timeout=30`, true); 

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                let response = JSON.parse(xhr.responseText);

                if (response.ok) {
                    let updates = response.result;

                    if (updates.length > 0) {
                        // Обработка полученных сообщений
                        updates.forEach(update => {
                            if (update.message) {
                                document.write("<br>" + update.message);
                            }
                        });

                        // Устанавливаем offset на id последнего обновления + 1
                        offset = updates[updates.length - 1].update_id + 1;
                    }
                } else {
                    console.error('Ошибка получения обновлений:', response.description);
                }

                getNewMessages();
            } else {
                console.error('Ошибка HTTP: ', xhr.statusText);
                setTimeout(getNewMessages, 1000);
            }
        };

        // Обрабатываем ошибку сети
        xhr.onerror = function () {
            console.error('Ошибка сети или невозможность выполнить запрос');
            setTimeout(getNewMessages, 1000);
        };

        xhr.send();
    }

    getNewMessages();
}
