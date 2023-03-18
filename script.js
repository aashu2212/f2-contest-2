function OpeningCeremony(callbackFnc) {
    console.log("Let the games begin");
    const score = { red: 0, blue: 0, green: 0, yellow: 0 };
    setTimeout(() => {
      Race100M(score, callbackFnc);
    }, 1000);
  }
  
  function Race100M(score, callbackFnc) {
    console.log("Race 100M begins");
    setTimeout(() => {
      const times = {
        red: Math.floor(Math.random() * 6) + 10,
        blue: Math.floor(Math.random() * 6) + 10,
        green: Math.floor(Math.random() * 6) + 10,
        yellow: Math.floor(Math.random() * 6) + 10,
      };
      console.log("Race 100M times:", times);
      const sortedTimes = Object.keys(times).sort((a, b) => times[a] - times[b]);
      score[sortedTimes[0]] += 50;
      score[sortedTimes[1]] += 25;
      console.log("Race 100M scores:", score);
      callbackFnc(score, LongJump);
    }, 3000);
  }
  
  function LongJump(score, callbackFnc) {
    console.log("Long jump begins");
    const winner = ["red", "yellow", "green", "blue"][Math.floor(Math.random() * 4)];
    score[winner] += 150;
    console.log(`Long jump winner is ${winner}, score:`, score);
    setTimeout(() => {
      callbackFnc(score, HighJump);
    }, 2000);
  }
  
  function HighJump(score) {
    console.log("High jump begins");
    const color = prompt("What color secured the highest jump?");
    if (color && score.hasOwnProperty(color)) {
      score[color] += 100;
      console.log(`High jump winner is ${color}, score:`, score);
    } else {
      console.log("Event was cancelled");
    }
    AwardCeremony(score);
  }
  
  function AwardCeremony(score) {
    console.log("Award ceremony begins");
    const sortedScores = Object.entries(score).sort((a, b) => b[1] - a[1]);
    console.log(
      `${sortedScores[0][0]} came first with ${sortedScores[0][1]} points. ` +
      `${sortedScores[1][0]} came second with ${sortedScores[1][1]} points. ` +
      `${sortedScores[2][0]} came third with ${sortedScores[2][1]} points.`
    );
  }
  
  OpeningCeremony((score, callbackFnc) => {
    console.log("Initial score:", score);
    callbackFnc(score, (score, callbackFnc) => {
      console.log("Score after Race 100M:", score);
      callbackFnc(score, (score, callbackFnc) => {
        console.log("Score after Long Jump:", score);
        callbackFnc(score, (score) => {
          console.log("Score after High Jump:", score);
        });
      });
    });
  });
  