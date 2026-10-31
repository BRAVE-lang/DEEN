// ==============================================================================
// DEEN — Zakat Calculation Engine & Fiqh Standards
// Classical Consensus & AAOIFI Standards (Surah At-Tawbah 9:60)
// ==============================================================================

import { ZakatCalculationInput, ZakatCalculationResult } from '@/types';

// Default Benchmark Weights for Nisab
export const NISAB_WEIGHTS = {
  goldGrams: 85.0,     // Classical consensus 20 mithqals ≈ 85g (or 87.48g Hanafi)
  silverGrams: 595.0   // Classical consensus 200 dirhams ≈ 595g (or 612.36g Hanafi)
};

// Default Metal Rates (Customizable by user in UI)
export const DEFAULT_METAL_PRICES = {
  USD: { goldPerGram: 85.50, silverPerGram: 1.05 },
  INR: { goldPerGram: 7850, silverPerGram: 95 },
  EUR: { goldPerGram: 79.20, silverPerGram: 0.98 },
  GBP: { goldPerGram: 67.50, silverPerGram: 0.83 },
  SAR: { goldPerGram: 320.0, silverPerGram: 3.95 },
  AED: { goldPerGram: 314.0, silverPerGram: 3.88 }
};

export const ZAKAT_RECIPIENTS_QURAN = [
  { category: 'Al-Fuqara (The Destitute / Extreme Poor)', reference: 'Surah At-Tawbah 9:60', description: 'Those who possess little or no wealth and cannot meet their basic survival needs.' },
  { category: 'Al-Masakeen (The Needy)', reference: 'Surah At-Tawbah 9:60', description: 'Those whose earnings or assets fall below the minimum threshold of sufficiency.' },
  { category: 'Al-Amileen ‘Alayha (Zakat Administrators)', reference: 'Surah At-Tawbah 9:60', description: 'Authorized personnel tasked with collecting, auditing, and distributing Zakat funds.' },
  { category: 'Al-Mu’allafatu Qulubuhum (Those Inclining Toward Faith)', reference: 'Surah At-Tawbah 9:60', description: 'New Muslims needing financial and community support or those whose hearts are being softened toward Islam.' },
  { category: 'Fir-Riqab (Freeing Captives / Bondage)', reference: 'Surah At-Tawbah 9:60', description: 'Historically for freeing slaves, modern scholars apply this to liberating bonded laborers and victims of human trafficking.' },
  { category: 'Al-Gharimeen (Debtors in Burden)', reference: 'Surah At-Tawbah 9:60', description: 'Individuals burdened with unpayable debts contracted for permissible basic living necessities.' },
  { category: 'Fi Sabeelillah (In the Cause of Allah)', reference: 'Surah At-Tawbah 9:60', description: 'Supporting the defense, propagation of Islamic education, dawah, and public welfare for Allah’s sake.' },
  { category: 'Ibn as-Sabeel (The Stranded Traveler)', reference: 'Surah At-Tawbah 9:60', description: 'A traveler stranded far from home who lacks sufficient funds to return, even if wealthy in their homeland.' }
];

/**
 * Calculates Zakat according to pure Islamic Fiqh
 */
export function calculateZakat(input: ZakatCalculationInput): ZakatCalculationResult {
  const cashTotal = (input.cashInHand || 0) + (input.bankSavings || 0);
  const goldTotal = (input.goldGrams || 0) * (input.goldPricePerGram || 0);
  const silverTotal = (input.silverGrams || 0) * (input.silverPricePerGram || 0);
  const businessTotal = input.tradeGoods || 0;
  const investmentsTotal = (input.investments || 0) + (input.receivables || 0);
  const deductions = input.dueLiabilities || 0;

  const totalAssets = cashTotal + goldTotal + silverTotal + businessTotal + investmentsTotal;
  const netZakatableWealth = Math.max(0, totalAssets - deductions);

  // Nisab threshold based on selected standard
  const nisabThreshold =
    input.nisabStandard === 'silver'
      ? NISAB_WEIGHTS.silverGrams * input.silverPricePerGram
      : NISAB_WEIGHTS.goldGrams * input.goldPricePerGram;

  const isEligibleForZakat = netZakatableWealth >= nisabThreshold && nisabThreshold > 0;
  
  // 2.5% on qualifying wealth held for a lunar year
  const zakatPayable = isEligibleForZakat ? Math.round(netZakatableWealth * 0.025 * 100) / 100 : 0;

  return {
    totalAssets: Math.round(totalAssets * 100) / 100,
    netZakatableWealth: Math.round(netZakatableWealth * 100) / 100,
    nisabThreshold: Math.round(nisabThreshold * 100) / 100,
    isEligibleForZakat,
    zakatPayable,
    breakdown: {
      cashTotal: Math.round(cashTotal * 100) / 100,
      goldTotal: Math.round(goldTotal * 100) / 100,
      silverTotal: Math.round(silverTotal * 100) / 100,
      businessTotal: Math.round(businessTotal * 100) / 100,
      investmentsTotal: Math.round(investmentsTotal * 100) / 100,
      deductions: Math.round(deductions * 100) / 100
    }
  };
}
