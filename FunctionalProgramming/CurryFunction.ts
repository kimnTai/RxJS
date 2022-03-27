// =========================
// 透過 curry，可以先讓 function 的重用性更高
// 且能在真正需要有資料時再進行運算
// =========================
const even = (inputArray: number[]) => {
    return inputArray.filter((item) => item % 2 === 0);
};

// power 是一個 curry function，
// 把設定 (n) 和 資料 (inputArray) 拆開來
const power = (n: number) => {
    // 回傳一個 function，只有這個 function 被呼叫時才會真正進行運算
    return (inputArray: number[]) => inputArray.map((item) => Math.pow(item, n));
};

const sum = (inputArray: number[]) => {
    return inputArray.reduce((previous, current) => previous + current, 0);
};

// 產生計算平方和次方的 function
const square = power(2);
const cube = power(3);

//console.log(`平方: ${square([1, 2, 3])}`); // 1, 4, 9
//console.log(`立方: ${cube([1, 2, 3])}`); // 1, 8, 27

const curryDemo = () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const curryDemo1 = () => {
        const sumEvenSquare = (inputArray: number[]) => {
            const evenData = even(inputArray);
            // 計算平方值
            const squareData = square(evenData);
            const sumResult = sum(squareData);
            return sumResult;
        };
        console.log(`偶數平方和: ${sumEvenSquare(data)}`);

        const sumEvenCube = (inputArray: number[]) => {
            const evenData = even(inputArray);
            // 計算立方值
            const cubeData = cube(evenData);
            const sumResult = sum(cubeData);
            return sumResult;
        };
        console.log(`偶數立方和: ${sumEvenCube(data)}`);
    };
    curryDemo1();

    const curryDemo2 = () => {
        // 由於多少次方和是可以抽換的，我們也可以寫成 curry function
        const sumEvenPower = (powerFn: any) => {
            return (inputArray: number[]) => {
                const evenData = even(inputArray);
                const powerData = powerFn(evenData);
                const sumResult = sum(powerData);
                return sumResult;
            };
        };

        // 建立偶數平方和的 function
        const sumEvenSquare = sumEvenPower(square);
        // 建立偶數立方和的 function
        const sumEvenCube = sumEvenPower(cube);
        console.log(`偶數平方和: ${sumEvenSquare(data)}`);
        console.log(`偶數立方和: ${sumEvenCube(data)}`);
    };
    curryDemo2();
};
console.log("=== 練習 curry function ===");

const composeDemo = () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // 因為最後才帶入資料，因此一樣是個 curry function
    const compose = (...fns: any) => {
        return (data: any) => {
            let result = data;
            // 從最後一個 function 開始執行
            for (let i = fns.length - 1; i >= 0; --i) {
                result = fns[i](result);
            }
            return result;
        };
    };

    const sumEvenPower = (powerFn: any) => {
        // 原本的寫法
        // const evenData = even(inputArray);
        // const powerData = powerFn(evenData);
        // const sumResult = sum(powerData);
        // return sumResult;

        // 呼叫順序從下往上為：even、powerFn、sum

        return compose(sum, powerFn, even);
    };

    const sumEvenSquare = sumEvenPower(square);
    const sumEvenCube = sumEvenPower(cube);

    console.log(`偶數平方和: ${sumEvenSquare(data)}`);
    console.log(`偶數立方和: ${sumEvenCube(data)}`);
};
console.log("=== 練習 compose ===");

const pipeDemo = () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // 因為最後才帶入資料，因此一樣是個 curry function
    const pipe = (...fns: any) => {
        return (data: any) => {
            let result = data;
            // 原本 compose 的 for 迴圈是從最後一個開始執行
            // pipe 內改為從第一個 function 開始執行
            fns.forEach((element: any) => (result = element(result)));
            return result;
        };
    };

    const sumEvenPower = (powerFn: any) => {
        // 呼叫順序為從上往下：even、powerFn、sum
        return pipe(even, powerFn, sum);
    };

    const sumEvenSquare = sumEvenPower(square);
    const sumEvenCube = sumEvenPower(cube);

    console.log(`偶數平方和: ${sumEvenSquare(data)}`);
    console.log(`偶數立方和: ${sumEvenCube(data)}`);
};
console.log("=== 練習 pipe ===");
pipeDemo();

const tapDemo = () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const pipe = (...fns: any) => {
        return (data: any) => {
            let result = data;
            for (let i = 0; i < fns.length; ++i) {
                result = fns[i](result);
            }
            return result;
        };
    };

    // tap 內處理資料的 function 會執行傳入的 function
    // 但不會對傳入的 data 做任何處理，就直接回傳
    // 目的是讓我們有機會在此處理一些 side effect
    // 直接回傳 data 則是方便後續的 function 繼續處理資料
    const tap = (fn: any) => {
        return (data: any) => {
            // 呼叫傳入的 function
            fn(data);
            // 直接回傳資料
            return data;
        };
    };

    const sumEvenPower = (powerFn: any) => {
        return pipe(
            even,
            // 用 tap 來隔離 side effect
            tap((data: any) => console.log("even 後，目前資料為", data)),
            powerFn,
            tap((data: any) => console.log("powerFn 後，目前資料為", data)),
            sum,
            tap((data: any) => console.log("sum 後，目前資料為", data))
        );
    };

    const sumEvenSquare = sumEvenPower(square);
    const sumEvenCube = sumEvenPower(cube);

    console.log(`偶數平方和: ${sumEvenSquare(data)}`);
    console.log(`偶數立方和: ${sumEvenCube(data)}`);

    // 以下範例特地在 tap 中做到讓程式出問題的 side effect
    // 由於我們可以確定除了 tap 外都是 pure function
    // 因此出問題時若確定 pure function 邏輯沒錯，就可以優先檢查 tap 內的實作
    const sumEvenPowerBugVer = (powerFn: any) => {
        return pipe(
            even,
            // pure function 邏輯沒問題時，就可以優先看 tap 內的程式碼
            tap((data: any) => {
                data.push(100);
            }),
            powerFn,
            sum
        );
    };

    const sumEvenSquare2 = sumEvenPowerBugVer(square);
    const sumEvenCube2 = sumEvenPowerBugVer(cube);

    console.log(`偶數平方和: ${sumEvenSquare2(data)}`);
    console.log(`偶數立方和: ${sumEvenCube2(data)}`);
};
