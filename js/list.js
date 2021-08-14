function list_result() {
    if (navigator.geolocation) { // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(function(position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            let latitude_ok = new Array();
            let longitude_ok = new Array();

            // 위도 처리
            for (let cafeteria of json_data) {
                try {
                    let latitude_cal = Number(cafeteria.latitude._text) - Number(latitude);
                    if (Math.abs(latitude_cal) <= 0.1) {
                        latitude_ok.push(cafeteria);
                    }
                } catch {}
            };

            //경도 처리
            for (let cafeteria of latitude_ok) {
                try {
                    let longitude_cal = Number(cafeteria.longitude._text) - Number(longitude);
                    if (Math.abs(longitude_cal) <= 0.1) {
                        longitude_ok.push(cafeteria);
                    }
                } catch {}
            };

            if (longitude_ok.length === 0) {
                let lists = document.createElement("div")
                const obj = document.getElementById("cafeteria_list");
                lists.innerHTML = '<center><h1 class="no_cafeteria">회원님의 근처엔<br>무료 급식소가 없네요 :(</h1></center>'
                obj.appendChild(lists);
            } else {
                // 리스트 처리
                for (let cafeteria of longitude_ok) {   
                    let lists = document.createElement("div")
                    const obj = document.getElementById("cafeteria_list");             
                    lists.innerHTML = '<div class="cafeteria_list_box">'+
                        '   <span class="cafeteria_name">'+ cafeteria.fcltyNm._text +'</span><br>'+
                        '   <span class="cafeteria_address">' + cafeteria.rdnmadr._text + '</span><br><br>'+
                        '   <span class="topic_txt">지급대상</span><br>'+
                        '   <span class="target_person">' + cafeteria.mlsvTrget._text + '</span><br><br>'+
                        '   <span class="topic_txt">영업시간</span><br>'+
                        '   <div style="display: flex;">'+
                        '       <div>'+
                        '           <span class="time">' + cafeteria.mlsvTime._text + '</span><br>'+
                        '           <span class="day_of_the_week">' + cafeteria.mlsvDate._text + '</span>'+
                        '       </div>'+
                        '       <a class="call" href="tel:' + cafeteria.phoneNumber._text + '">'+
                        '           <div style="display: flex; align-items: center; justify-content: center;">'+
                        '               <i class="fa fa-phone" aria-hidden="true" style="color: #ffffff; font-size: 30px;"></i>'+
                        '           </div>'+
                        '       </a>'+
                        '   </div>'+
                        '</div>'
                    obj.appendChild(lists);
                }
            }
        }, function(error) {
            console.error(error);
        }, {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity
        });
    } else {
        alert('GPS가 차단되었거나 찾을 수 없습니다.');
    }
}
/*
function list_result() {

    let latitude_ok = new Array();
    let longitude_ok = new Array();

    // 위도 처리
    for (let cafeteria of json_data) {
        let latitude_cal = latitude - Number(latitude);
        if (Math.abs(latitude_cal) <= 0.001) {
            latitude_ok.push(cafeteria);
        }
    };

    //경도 처리
    for (let cafeteria of latitude_ok) {
        let longitude_cal = longitude - Number(longitude);
        if (Math.abs(longitude_cal) <= 0.001) {
            longitude_ok.push(cafeteria);
        }
    }
    
    
    const obj = document.getElementById("cafeteria_list");

    if (longitude_ok.length === 0) {
        let lists = document.createElement("div")
        lists.innerHTML = '<center><h1 class="no_cafeteria">회원님의 근처엔<br>무료 급식소가 없네요 :(</h1></center>'
        obj.appendChild(lists);
    } else {
        // 리스트 처리
        for (let cafeteria of longitude_ok) {
            console.log(obj)

            let lists = document.createElement("div")
            lists.innerHTML = '<div class="cafeteria_list_box">'+
                '   <span class="cafeteria_name">'+ cafeteria.fcltyNm._text +'</span><br>'+
                '   <span class="cafeteria_address">' + cafeteria.rdnmadr._text + '</span><br><br>'+
                '   <span class="topic_txt">지급대상</span><br>'+
                '   <span class="target_person">' + cafeteria.mlsvTrget._text + '</span><br><br>'+
                '   <span class="topic_txt">영업시간</span><br>'+
                '   <div style="display: flex;">'+
                '       <div>'+
                '           <span class="time">' + cafeteria.mlsvTime._text + '</span><br>'+
                '           <span class="day_of_the_week">' + cafeteria.mlsvDate._text + '</span>'+
                '       </div>'+
                '       <a class="call" href="tel:' + cafeteria.phoneNumber._text + '">'+
                '           <div style="display: flex; align-items: center; justify-content: center;">'+
                '               <i class="fa fa-phone" aria-hidden="true" style="color: #ffffff; font-size: 30px;"></i>'+
                '           </div>'+
                '       </a>'+
                '   </div>'+
                '</div>'
            obj.appendChild(lists);
        }
    }
}
*/