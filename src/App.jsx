export default function App() {
  const ships = [
    {
      name: 'Yamato',
      tier: 'VIII',
      nation: 'Japan',
      type: 'Battleship',
      image: 'https://wowslegends.com/uploads/monthly_2023_01/yamato.jpg'
    },
    {
      name: 'Iowa',
      tier: 'VII',
      nation: 'USA',
      type: 'Battleship',
      image: 'https://wowslegends.com/uploads/monthly_2023_01/iowa.jpg'
    }
  ]

  return (
    <div style={{
      background: '#0b1220',
      minHeight: '100vh',
      color: 'white',
      padding: '20px',
      fontFamily: 'Arial'
    }}>
      <h1>Fleet Command</h1>

      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <div>💰 Prata: 25.000.000</div>
        <div>⭐ XP Global: 120.000</div>
        <div>🪙 Ouro: 5.000</div>
        <div>💸 Gasto: R$ 850</div>
      </div>

      <h2>Navios</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {ships.map((ship) => (
          <div key={ship.name} style={{
            background: '#1a2333',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <img
              src={ship.image}
              alt={ship.name}
              style={{
                width: '100%',
                height: '160px',
                objectFit: 'cover'
              }}
            />

            <div style={{ padding: '12px' }}>
              <h3>{ship.name}</h3>
              <p>Tier: {ship.tier}</p>
              <p>Nação: {ship.nation}</p>
              <p>Tipo: {ship.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}