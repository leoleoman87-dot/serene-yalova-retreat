import React, { useState } from 'react';

interface AdminModalProps {
  onClose?: () => void;
}

export function AdminModal({ onClose }: AdminModalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const bookings = JSON.parse(localStorage.getItem('retreat_bookings') || '[]');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'yalova2026') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', maxWidth: '800px', margin: '40px auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      {!isLoggedIn ? (
        <div style={{ maxWidth: '320px', margin: '0 auto', padding: '20px 0' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '15px', textAlign: 'center' }}>Admin Girişi</h2>
          {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px', textAlign: 'center' }}>{error}</p>}
          <form onSubmit={handleLogin}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Kullanıcı Adı:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', marginBottom: '12px', border: '1px solid #ccc', borderRadius: '4px' }} 
            />
            
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Şifre:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '4px' }} 
            />

            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#4a6b5d', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              Giriş Yap
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            <h2 style={{ fontSize: '20px', margin: 0 }}>Yönetim Paneli</h2>
            <button onClick={() => setIsLoggedIn(false)} style={{ padding: '6px 12px', backgroundColor: '#d9534f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Oturumu Kapat
            </button>
          </div>

          {bookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Giriş Başarılı!</p>
              <p>Şu an sistemde kayıtlı yeni rezervasyon bulunmuyor.</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd', background: '#f8f9fa' }}>
                  <th style={{ padding: '10px' }}>Tarihler</th>
                  <th style={{ padding: '10px' }}>Oda</th>
                  <th style={{ padding: '10px' }}>Müşteri</th>
                  <th style={{ padding: '10px' }}>Tutar</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b: any) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px' }}>{b.checkIn} / {b.checkOut}</td>
                    <td style={{ padding: '10px' }}>{b.roomName}</td>
                    <td style={{ padding: '10px' }}>{b.cardName || 'Misafir'} ({b.guests} Kişi)</td>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{b.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
      }
                                          
