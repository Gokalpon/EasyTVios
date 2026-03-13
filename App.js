import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView,
  StatusBar, Dimensions, ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Rect, Path, Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const SERVICES = [
  { id: 'netflix',  name: 'Netflix',   color: '#E50914' },
  { id: 'youtube',  name: 'YouTube',   color: '#FF0000' },
  { id: 'disney',   name: 'Disney+',   color: '#0ABFBC' },
  { id: 'prime',    name: 'Prime',     color: '#1A98FF' },
  { id: 'hbo',      name: 'HBO',       color: '#9146FF' },
  { id: 'appletv',  name: 'Apple TV',  color: '#aaaaaa' },
  { id: 'spotify',  name: 'Spotify',   color: '#1DB954' },
  { id: 'exxen',    name: 'EXXEN',     color: '#E8C000' },
  { id: 'bein',     name: 'beIN',      color: '#8B5CF6' },
];

// ─── Logo ────────────────────────────────────────────────────────────────────
function EasyTVLogo({ size = 1 }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      {/* [Easy] kutusu */}
      <View style={{
        borderWidth: 2, borderColor: 'rgba(255,255,255,0.82)',
        borderRadius: 5, paddingHorizontal: 8, paddingVertical: 2,
      }}>
        <Text style={{ fontSize: 13 * size, fontWeight: '700', color: '#fff' }}>Easy</Text>
      </View>
      {/* TV ikonu SVG */}
      <Svg width={20 * size} height={17 * size} viewBox="0 0 20 17" fill="none">
        <Rect x="1" y="1" width="18" height="11" rx="2" stroke="white" strokeWidth="1.7" />
        <Path d="M5.5 12v3M14.5 12v3M3.5 15h13" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
      </Svg>
      {/* TV yazısı */}
      <Text style={{ fontSize: 26 * size, fontWeight: '900', color: '#fff', letterSpacing: -1.5, lineHeight: 28 * size }}>TV</Text>
    </View>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step, total = 3 }) {
  return (
    <View style={styles.progressBar}>
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={[styles.progressSegment, i < step && styles.progressActive]} />
      ))}
    </View>
  );
}

// ─── Ekran 1: Karşılama ───────────────────────────────────────────────────────
function WelcomeScreen({ onNext }) {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <View style={styles.welcomeContent}>

        {/* TV İkonu kutu */}
        <View style={styles.tvIconBox}>
          <Svg width={28} height={22} viewBox="0 0 28 22" fill="none">
            <Rect x="1" y="1" width="26" height="15" rx="2.5" stroke="white" strokeWidth="1.6" opacity="0.9" />
            <Path d="M8 16v3M20 16v3M6 19h16" stroke="white" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
          </Svg>
        </View>

        <Text style={styles.appName}>EasyTV</Text>
        <Text style={styles.appTagline}>Tüm üyelikleriniz,{'\n'}tek bir yerde.</Text>

        {/* Checkmark listesi */}
        <View style={styles.featureList}>
          {[
            'Otomatik yenileme takibi',
            'Aylık harcama özeti',
            'PIN & Face ID koruması',
          ].map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <View style={styles.checkBox}>
                <Svg width={10} height={8} viewBox="0 0 10 8" fill="none">
                  <Path d="M1.5 4l2.5 2.5 4.5-4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </View>
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>

        {/* Pill seçiciler */}
        <View style={styles.pillRow}>
          <View style={styles.pill}>
            <Text style={styles.pillFlag}>🇹🇷</Text>
            <Text style={styles.pillText}>Türkiye</Text>
            <Text style={styles.pillChevron}>›</Text>
          </View>
          <View style={styles.pill}>
            <Text style={styles.pillFlag}>🇹🇷</Text>
            <Text style={styles.pillText}>Türkçe</Text>
            <Text style={styles.pillChevron}>›</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.btnPrimary} onPress={onNext}>
          <Text style={styles.btnPrimaryText}>Başla</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSecondary}>
          <Text style={styles.btnSecondaryText}>Giriş yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Ekran 2: Servis Seçimi ───────────────────────────────────────────────────
function ServiceScreen({ onNext }) {
  const [selected, setSelected] = useState(['netflix', 'youtube', 'prime', 'spotify']);

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <ProgressBar step={2} />

      <Text style={styles.screenTitle}>Servislerini seç</Text>
      <Text style={styles.screenSubtitle}>İstediğin zaman ekleyip çıkarabilirsin</Text>

      <View style={styles.serviceGrid}>
        {SERVICES.map(s => {
          const sel = selected.includes(s.id);
          return (
            <TouchableOpacity
              key={s.id}
              style={[styles.serviceCard, sel && styles.serviceCardSel]}
              onPress={() => toggle(s.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.serviceIconBox, { backgroundColor: s.color + '22', borderColor: s.color + '44' }]}>
                <Text style={[styles.serviceInitial, { color: s.color }]}>{s.name[0]}</Text>
                {sel && (
                  <View style={styles.serviceCheck}>
                    <Svg width={6} height={5} viewBox="0 0 6 5" fill="none">
                      <Path d="M1 2.5l1.5 1.5 2.5-2.5" stroke="#111" strokeWidth="1.3" strokeLinecap="round" />
                    </Svg>
                  </View>
                )}
              </View>
              <Text style={[styles.serviceName, { color: `rgba(255,255,255,${sel ? 0.5 : 0.22})` }]}>{s.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.btnPrimary} onPress={onNext}>
          <Text style={styles.btnPrimaryText}>Devam — {selected.length} seçili</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNext}>
          <Text style={[styles.btnSecondaryText, { textAlign: 'center', marginTop: 12 }]}>Atla</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Ekran 3: PIN ─────────────────────────────────────────────────────────────
function PinScreen({ onDone }) {
  const [pin, setPin] = useState('');

  const press = (k) => {
    if (k === '⌫') { setPin(p => p.slice(0, -1)); return; }
    if (pin.length < 4) setPin(p => p + k);
  };

  const done = async () => {
    await AsyncStorage.setItem('pin', pin);
    onDone();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <ProgressBar step={3} />

      <Text style={styles.screenTitle}>PIN oluştur</Text>
      <Text style={styles.screenSubtitle}>4 haneli giriş şifresi belirle</Text>

      <View style={styles.pinDots}>
        {[0, 1, 2, 3].map(i => (
          <View key={i} style={[styles.dot, i < pin.length && styles.dotFilled]} />
        ))}
      </View>

      <View style={styles.numpad}>
        {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((k, i) => (
          k === '' ? <View key={i} style={styles.numpadEmpty} /> :
          <TouchableOpacity key={i} style={styles.numKey} onPress={() => press(String(k))} activeOpacity={0.6}>
            <Text style={styles.numKeyText}>{k}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={[styles.btnPrimary, pin.length < 4 && { opacity: 0.25 }]}
          onPress={done}
          disabled={pin.length < 4}
        >
          <Text style={styles.btnPrimaryText}>Tamamla</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDone}>
          <Text style={[styles.btnSecondaryText, { textAlign: 'center', marginTop: 12 }]}>PIN kullanmak istemiyorum</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Ana App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(0);

  return (
    <>
      {step === 0 && <WelcomeScreen onNext={() => setStep(1)} />}
      {step === 1 && <ServiceScreen onNext={() => setStep(2)} />}
      {step === 2 && <PinScreen onDone={() => setStep(3)} />}
      {step === 3 && (
        <SafeAreaView style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
          <EasyTVLogo />
          <Text style={{ color: 'rgba(255,255,255,0.4)', marginTop: 20, fontSize: 13 }}>Ana ekrana hoş geldiniz</Text>
        </SafeAreaView>
      )}
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const BG = '#0e0f14';
const BG2 = 'linear-gradient(160deg, #161820 0%, #0e0f14 60%, #0a0b10 100%)';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  // Progress
  progressBar: { flexDirection: 'row', gap: 4, marginTop: 12, marginBottom: 24 },
  progressSegment: { flex: 1, height: 2, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.1)' },
  progressActive: { backgroundColor: 'rgba(255,255,255,0.5)' },

  // Welcome
  welcomeContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tvIconBox: {
    width: 58, height: 58,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 18,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 18,
  },
  appName: { fontSize: 22, fontWeight: '800', color: '#fff', letterSpacing: -0.5, marginBottom: 7 },
  appTagline: { fontSize: 13, color: 'rgba(255,255,255,0.32)', textAlign: 'center', lineHeight: 20, marginBottom: 28 },

  featureList: { width: '100%', gap: 12, marginBottom: 28 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkBox: {
    width: 22, height: 22, borderRadius: 7,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  featureText: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },

  pillRow: { flexDirection: 'row', gap: 8 },
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)',
    borderRadius: 18, paddingHorizontal: 11, paddingVertical: 6,
  },
  pillFlag: { fontSize: 12 },
  pillText: { fontSize: 11, color: 'rgba(255,255,255,0.45)' },
  pillChevron: { fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: -1 },

  // Titles
  screenTitle: { fontSize: 16, fontWeight: '700', color: '#fff', letterSpacing: -0.2, marginBottom: 4 },
  screenSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.28)', marginBottom: 16 },

  // Services
  serviceGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8,
    flex: 1, alignContent: 'flex-start',
  },
  serviceCard: {
    width: (width - 48 - 16) / 3,
    borderRadius: 12, paddingVertical: 10,
    alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
  },
  serviceCardSel: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderColor: 'rgba(255,255,255,0.18)',
  },
  serviceIconBox: {
    width: 32, height: 32, borderRadius: 9,
    borderWidth: 1, justifyContent: 'center', alignItems: 'center',
    position: 'relative',
  },
  serviceInitial: { fontSize: 13, fontWeight: '800' },
  serviceCheck: {
    position: 'absolute', top: -4, right: -4,
    width: 13, height: 13, borderRadius: 7,
    backgroundColor: '#fff',
    justifyContent: 'center', alignItems: 'center',
  },
  serviceName: { fontSize: 8, textAlign: 'center' },

  // PIN
  pinDots: { flexDirection: 'row', gap: 14, justifyContent: 'center', marginTop: 20, marginBottom: 36 },
  dot: { width: 11, height: 11, borderRadius: 6, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)' },
  dotFilled: { backgroundColor: 'rgba(255,255,255,0.8)', borderColor: 'transparent' },
  numpad: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', flex: 1, alignContent: 'center' },
  numpadEmpty: { width: 72, height: 56 },
  numKey: {
    width: 72, height: 56, borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
    justifyContent: 'center', alignItems: 'center',
  },
  numKeyText: { fontSize: 20, color: 'rgba(255,255,255,0.7)', fontWeight: '300' },

  // Buttons
  bottomButtons: { width: '100%', marginTop: 16 },
  btnPrimary: {
    width: '100%', backgroundColor: '#fff',
    borderRadius: 14, paddingVertical: 15, alignItems: 'center',
  },
  btnPrimaryText: { color: '#111', fontSize: 15, fontWeight: '700' },
  btnSecondary: {
    width: '100%', backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14, paddingVertical: 13, alignItems: 'center', marginTop: 8,
  },
  btnSecondaryText: { color: 'rgba(255,255,255,0.35)', fontSize: 12 },
});
