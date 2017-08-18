
port.on('open',() => {
  setInterval(() => port.write('Test'),500);
});

port.on('data',(data) => {
  console.log(ab2str(data));
});