import React from "react";

function App() {
  const [sec, setSec] = React.useState(0);
  const [mins, setMins] = React.useState(0);
  const [hours, setHours] = React.useState(0);
  const [isWorking, setIsWorking] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setInterval>>();
  const remainingTimeRef = React.useRef(0);

  function changeSeconds(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value) {
      let value = parseInt(e.target.value);
      if (value < 60) setSec(value);
    } else setSec(0);
  }

  function changeMins(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value) {
      let value = parseInt(e.target.value);
      if (value < 60) setMins(value);
    } else setMins(0);
  }

  function makeTick() {
    if (remainingTimeRef.current <= 0) {
      setIsWorking(false);
      alert("Время истекло");
      return clearInterval(timerRef.current);
    }
    const now = new Date().getTime();
    remainingTimeRef.current -= 1;
    let time = Math.floor(remainingTimeRef.current);
    const rHours = Math.floor(time / 3600);
    time = time % 3600;
    const rMins = Math.floor(time / 60);
    time = time % 60;
    setHours(rHours);
    setMins(rMins);
    setSec(time);
  }

  function onClick() {
    if (!isWorking) {
      setIsWorking(true);
      remainingTimeRef.current = sec + mins * 60 + hours * 3600;
      timerRef.current = setInterval(makeTick, 1000);
    } else {
      setIsWorking(false);
      clearInterval(timerRef.current);
    }
  }

  return (
    <div className="text-white bg-neutral-800 w-full h-screen flex flex-col items-center justify-center">
      <div className="flex items-center gap-2">
        <input
          disabled={isWorking}
          placeholder="00"
          className="bg-transparent w-40 p-2 rounded-md text-5xl text-center outline-none"
          type="text"
          onChange={(e) =>
            setHours(parseInt(e.target.value ? e.target.value : "0"))
          }
          value={hours}
        />

        <input
          disabled={isWorking}
          placeholder="00"
          className=" bg-transparent w-20 p-2 rounded-md text-5xl text-center outline-none"
          type="text"
          onChange={changeMins}
          value={mins}
        />

        <input
          disabled={isWorking}
          placeholder="00"
          className="bg-transparent w-20 p-2 rounded-md text-5xl text-center outline-none"
          type="text"
          onChange={changeSeconds}
          value={sec}
        />
      </div>
      <button
        onClick={onClick}
        className="mt-8 border rounded-md px-8 py-2 transition-all hover:bg-neutral-400"
      >
        {isWorking ? "Отменить" : "Запустить"}
      </button>
    </div>
  );
}

export default App;
