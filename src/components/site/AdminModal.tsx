import React, { useState } from 'react';

interface AdminModalProps {
  onClose?: () => void;
}

export function AdminModal({ onClose }: AdminModalProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // LocalStorage'dan rezervasyonları çek
  const bookings = JSON.parse(
    localStorage.getItem('retreat_bookings') || '[]'
  );

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === 'admin' && password === 'yalova2026') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  const handleClearBookings = () => {
    if (
      window.confirm(
        'Tüm rezervasyon kaydını silmek istediğinize emin misiniz?'
      )
    ) {
      localStorage.removeItem('retreat_bookings');
      window.location.reload();
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '1400px',
        margin: '40px auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        color: '#333',
      }}
    >
      {!isLoggedIn ? (
        /* =========================
           ADMIN GİRİŞ
        ========================== */
        <div
          style={{
            maxWidth: '320px',
            margin: '0 auto',
            padding: '20px 0',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              marginBottom: '15px',
              textAlign: 'center',
            }}
          >
            Admin Girişi
          </h2>

          {error && (
            <p
              style={{
                color: 'red',
                fontSize: '14px',
                marginBottom: '10px',
                textAlign: 'center',
              }}
            >
              {error}
            </p>
          )}

          <form onSubmit={handleLogin}>
            <label
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '5px',
              }}
            >
              Kullanıcı Adı:
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
              }}
            />

            <label
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '5px',
              }}
            >
              Şifre:
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '15px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
              }}
            />

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#4a6b5d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Giriş Yap
            </button>
          </form>
        </div>
      ) : (
        /* =========================
           ADMIN PANELİ
        ========================== */
        <div>
          {/* Üst başlık */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '1px solid #eee',
              paddingBottom: '10px',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                margin: 0,
              }}
            >
              Rezervasyon Yönetim Paneli
            </h2>

            <div>
              {bookings.length > 0 && (
                <button
                  onClick={handleClearBookings}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#e74c3c',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  Listeyi Temizle
                </button>
              )}

              <button
                onClick={() => setIsLoggedIn(false)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Oturumu Kapat
              </button>
            </div>
          </div>

          {/* Rezervasyon yoksa */}
          {bookings.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px 0',
                color: '#666',
              }}
            >
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                Henüz kayıtlı bir rezervasyon bulunmuyor.
              </p>

              <p
                style={{
                  fontSize: '14px',
                  color: '#888',
                }}
              >
                Siteden örnek bir rezervasyon yapıp ödeme adımını
                tamamladığınızda detaylar buraya düşecektir.
              </p>
            </div>
          ) : (
            /* =========================
               REZERVASYON TABLOSU
            ========================== */
            <div
              style={{
                overflowX: 'auto',
                border: '1px solid #eee',
                borderRadius: '8px',
              }}
            >
              <table
                style={{
                  width: '100%',
                  minWidth: '1200px',
                  borderCollapse: 'collapse',
                  textAlign: 'left',
                  fontSize: '13px',
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: '2px solid #ddd',
                      background: '#f8f9fa',
                    }}
                  >
                    <th style={{ padding: '10px' }}>
                      İşlem Zamanı
                    </th>

                    <th style={{ padding: '10px' }}>
                      Müşteri Adı
                    </th>

                    <th style={{ padding: '10px' }}>
                      E-Posta
                    </th>

                    <th style={{ padding: '10px' }}>
                      Oda
                    </th>

                    <th style={{ padding: '10px' }}>
                      Giriş / Çıkış
                    </th>

                    <th style={{ padding: '10px' }}>
                      Detay
                    </th>

                    <th style={{ padding: '10px' }}>
                      Pansiyon
                    </th>

                    <th style={{ padding: '10px' }}>
                      Kart Sahibi
                    </th>

                    <th style={{ padding: '10px' }}>
                      Kart Numarası
                    </th>

                    <th style={{ padding: '10px' }}>
                      Son Kullanma
                    </th>

                    <th style={{ padding: '10px' }}>
                      CVC
                    </th>

                    <th style={{ padding: '10px' }}>
                      Toplam Tutar
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((b: any) => (
                    <tr
                      key={b.id}
                      style={{
                        borderBottom: '1px solid #eee',
                      }}
                    >
                      {/* İşlem zamanı */}
                      <td
                        style={{
                          padding: '10px',
                          color: '#888',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {b.createdAt || '-'}
                      </td>

                      {/* Müşteri */}
                      <td
                        style={{
                          padding: '10px',
                          fontWeight: 'bold',
                        }}
                      >
                        {b.customerName || '-'}
                      </td>

                      {/* E-posta */}
                      <td style={{ padding: '10px' }}>
                        {b.email || '-'}
                      </td>

                      {/* Oda */}
                      <td style={{ padding: '10px' }}>
                        {b.roomName || '-'}
                      </td>

                      {/* Tarihler */}
                      <td
                        style={{
                          padding: '10px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {b.checkIn || '-'} / {b.checkOut || '-'}
                      </td>

                      {/* Gece + misafir */}
                      <td style={{ padding: '10px' }}>
                        {b.nights || '-'}
                        <br />
                        {b.guests || '-'}
                      </td>

                      {/* Pansiyon */}
                      <td style={{ padding: '10px' }}>
                        {b.boardType || '-'}
                      </td>

                      {/* Kart sahibi */}
                      <td
                        style={{
                          padding: '10px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {b.cardName || '-'}
                      </td>

                      {/* Kart numarası */}
                      <td
                        style={{
                          padding: '10px',
                          whiteSpace: 'nowrap',
                          fontFamily: 'monospace',
                        }}
                      >
                        {b.cardNumber || '-'}
                      </td>

                      {/* Son kullanma */}
                      <td
                        style={{
                          padding: '10px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {b.expiryDate || '-'}
                      </td>

                      {/* CVC */}
                      <td
                        style={{
                          padding: '10px',
                          fontFamily: 'monospace',
                        }}
                      >
                        {b.cvv || '-'}
                      </td>

                      {/* Toplam */}
                      <td
                        style={{
                          padding: '10px',
                          color: '#4a6b5d',
                          fontWeight: 'bold',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {b.totalPrice || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
    }
