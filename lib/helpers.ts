export const calcTimeLeft = (date: string) => {
    const difference = +new Date(date) - +new Date();
    let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
    }

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
        };
        if(timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0){
            return "About to end"
        }
        if(timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes > 0){
            return `${timeLeft.minutes}m`;
        }
        if(timeLeft.days === 0 && timeLeft.hours > 0){
            return `${timeLeft.hours}h ${timeLeft.minutes}m`;
        }
        if(timeLeft.days > 0){
            return `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`;
        }
    }

    if(timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0) {
        return "Event ended";
    }

};

export const reduceDesc = (desc: string, length: number) => {
  if (desc) {
    return desc.length > length ? `${desc.slice(0, length)}...` : desc;
  }
};
