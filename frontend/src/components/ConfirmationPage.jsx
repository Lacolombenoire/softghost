function MaPage() {
  const handleClick = () => {
    alert("OK cliqué !");
  };

  return (
    <div className="ma-page">
      {/* Ton HTML converti en JSX ici */}
      <h1>Confirmation</h1>
      <button style={{ border: '2px solid green' }} onClick={handleClick}>
        OK
      </button>
    </div>
  );
}

export default MaPage;
