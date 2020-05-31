const mongoose = require("mongoose");

module.exports = () => {
    const connect = () => {

        // 개발환경이 아닐 때, 몽구스가 생성하는 쿼리 내용을 콘솔을 통해 확인
        if(process.env.NODE_ENV !== "production"){
            mongoose.set("debug", true);
        }

        // 몽구스 몽고디비 연결
        mongoose.connect("mongodb://root:mongodb@localhost:27017/admin", {dbName: "moa"}, 
        (error) => {
            if(error) {
                console.log("몽고디비 연결 에러", error);
            } else {
                console.log("몽고디비 연결 성공");
            }
        });
    };

    connect();

    // 몽구스 이벤트 리스너들
    mongoose.connection.on("error", (error) => {
        console.log("몽고디비 연결 에러", error);
    });

    mongoose.connection.on("disconnected", () => {
        console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
        connect();
    });

    // 연결할 스키마 설정
    require("./MeetingLog");
    require("./Calender");
    require("./Member");
};