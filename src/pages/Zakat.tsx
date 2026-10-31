// ==============================================================================
// DEEN — Zakat Calculator Page
// Classical Consensus & AAOIFI Standards (Surah At-Tawbah 9:60)
// ==============================================================================

import React, { useState } from 'react';
import {
  Calculator,
  Coins,
  ShieldCheck,
  HelpCircle,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  calculateZakat,
  DEFAULT_METAL_PRICES,
  NISAB_WEIGHTS,
  ZAKAT_RECIPIENTS_QURAN
} from '@/services/zakatService';
import { ZakatCalculationInput } from '@/types';

export const Zakat: React.FC = () => {
  const { t } = useLanguage();
  const [currency, setCurrency] = useState<'USD' | 'INR' | 'EUR' | 'GBP' | 'SAR' | 'AED'>('USD');
  const [nisabStandard, setNisabStandard] = useState<'silver' | 'gold'>('silver');

  const [input, setInput] = useState<ZakatCalculationInput>({
    cashInHand: 0,
    bankSavings: 0,
    goldGrams: 0,
    goldPricePerGram: DEFAULT_METAL_PRICES.USD.goldPerGram,
    silverGrams: 0,
    silverPricePerGram: DEFAULT_METAL_PRICES.USD.silverPerGram,
    tradeGoods: 0,
    investments: 0,
    receivables: 0,
    dueLiabilities: 0,
    nisabStandard: 'silver',
    currency: 'USD'
  });

  const handleCurrencyChange = (curr: 'USD' | 'INR' | 'EUR' | 'GBP' | 'SAR' | 'AED') => {
    setCurrency(curr);
    setInput(prev => ({
      ...prev,
      currency: curr,
      goldPricePerGram: DEFAULT_METAL_PRICES[curr].goldPerGram,
      silverPricePerGram: DEFAULT_METAL_PRICES[curr].silverPerGram
    }));
  };

  const handleStandardChange = (std: 'silver' | 'gold') => {
    setNisabStandard(std);
    setInput(prev => ({ ...prev, nisabStandard: std }));
  };

  const result = calculateZakat(input);

  return (
    <div className="pb-24 pt-2 px-4 max-w-md mx-auto space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-deen-forest dark:text-deen-ivory">
          {t('zakat')} Calculator
        </h1>
        <p className="text-xs text-stone-500">
          Pure 2.5% Islamic wealth purification
        </p>
      </div>

      {/* Currency & Nisab Standard Selector */}
      <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-stone-700 dark:text-stone-300">Currency</span>
          <select
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value as any)}
            className="p-1.5 rounded-lg bg-stone-100 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 font-bold text-deen-emerald text-xs"
          >
            {Object.keys(DEFAULT_METAL_PRICES).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <span className="text-[11px] font-semibold text-stone-500 block mb-1.5">
            Nisab Standard
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleStandardChange('silver')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                nisabStandard === 'silver'
                  ? 'bg-deen-emerald text-white border-deen-emerald shadow-sm'
                  : 'bg-stone-50 dark:bg-deen-charcoal border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
              }`}
            >
              <span className="font-bold block">Silver Standard</span>
              <span className={`text-[10px] block ${nisabStandard === 'silver' ? 'text-emerald-100' : 'text-stone-400'}`}>
                {NISAB_WEIGHTS.silverGrams}g (Recommended by majority scholars to benefit more poor)
              </span>
            </button>

            <button
              onClick={() => handleStandardChange('gold')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                nisabStandard === 'gold'
                  ? 'bg-deen-emerald text-white border-deen-emerald shadow-sm'
                  : 'bg-stone-50 dark:bg-deen-charcoal border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
              }`}
            >
              <span className="font-bold block">Gold Standard</span>
              <span className={`text-[10px] block ${nisabStandard === 'gold' ? 'text-emerald-100' : 'text-stone-400'}`}>
                {NISAB_WEIGHTS.goldGrams}g
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Asset Input Fields */}
      <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
          Zakatable Assets
        </h3>

        {/* Cash */}
        <div>
          <label className="text-[11px] font-semibold text-stone-500 block mb-1">
            Cash on Hand & in Bank Accounts ({currency})
          </label>
          <input
            type="number"
            min="0"
            value={input.cashInHand || ''}
            onChange={(e) => setInput({ ...input, cashInHand: Number(e.target.value) })}
            placeholder="0"
            className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 font-mono text-stone-800 dark:text-stone-200"
          />
        </div>

        {/* Gold */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-semibold text-stone-500 block mb-1">
              Gold (Grams)
            </label>
            <input
              type="number"
              min="0"
              value={input.goldGrams || ''}
              onChange={(e) => setInput({ ...input, goldGrams: Number(e.target.value) })}
              placeholder="0"
              className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 font-mono text-stone-800 dark:text-stone-200"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-stone-500 block mb-1">
              Price/g ({currency})
            </label>
            <input
              type="number"
              min="0"
              value={input.goldPricePerGram}
              onChange={(e) => setInput({ ...input, goldPricePerGram: Number(e.target.value) })}
              className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 font-mono text-stone-800 dark:text-stone-200"
            />
          </div>
        </div>

        {/* Silver */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-semibold text-stone-500 block mb-1">
              Silver (Grams)
            </label>
            <input
              type="number"
              min="0"
              value={input.silverGrams || ''}
              onChange={(e) => setInput({ ...input, silverGrams: Number(e.target.value) })}
              placeholder="0"
              className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 font-mono text-stone-800 dark:text-stone-200"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-stone-500 block mb-1">
              Price/g ({currency})
            </label>
            <input
              type="number"
              min="0"
              value={input.silverPricePerGram}
              onChange={(e) => setInput({ ...input, silverPricePerGram: Number(e.target.value) })}
              className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 font-mono text-stone-800 dark:text-stone-200"
            />
          </div>
        </div>

        {/* Business Inventory & Investments */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-semibold text-stone-500 block mb-1">
              Business Stock ({currency})
            </label>
            <input
              type="number"
              min="0"
              value={input.tradeGoods || ''}
              onChange={(e) => setInput({ ...input, tradeGoods: Number(e.target.value) })}
              placeholder="0"
              className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 font-mono text-stone-800 dark:text-stone-200"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-stone-500 block mb-1">
              Shares/Investments ({currency})
            </label>
            <input
              type="number"
              min="0"
              value={input.investments || ''}
              onChange={(e) => setInput({ ...input, investments: Number(e.target.value) })}
              placeholder="0"
              className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 font-mono text-stone-800 dark:text-stone-200"
            />
          </div>
        </div>

        {/* Deductions (Debts Due) */}
        <div>
          <label className="text-[11px] font-semibold text-stone-500 block mb-1">
            Deductible Immediate Debts Due ({currency})
          </label>
          <input
            type="number"
            min="0"
            value={input.dueLiabilities || ''}
            onChange={(e) => setInput({ ...input, dueLiabilities: Number(e.target.value) })}
            placeholder="0"
            className="w-full text-xs p-2.5 rounded-xl bg-stone-50 dark:bg-deen-charcoal border border-stone-200 dark:border-stone-700 font-mono text-stone-800 dark:text-stone-200"
          />
        </div>
      </div>

      {/* Results Summary Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-deen-forest via-deen-forest-light to-deen-emerald text-white p-6 shadow-xl border border-emerald-700/30 space-y-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold block">
            Net Zakatable Wealth
          </span>
          <span className="text-2xl font-black font-mono">
            {currency} {result.netZakatableWealth.toLocaleString()}
          </span>
          <p className="text-[11px] text-emerald-200/80 mt-0.5">
            Nisab Threshold: {currency} {result.nisabThreshold.toLocaleString()}
          </p>
        </div>

        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-deen-gold-accent font-semibold block">
              Zakat Payable (2.5%)
            </span>
            <span className="text-3xl font-black font-mono text-white">
              {currency} {result.zakatPayable.toLocaleString()}
            </span>
          </div>

          <div className="text-right">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
              result.isEligibleForZakat
                ? 'bg-deen-gold text-white shadow-md'
                : 'bg-black/30 text-emerald-200'
            }`}>
              {result.isEligibleForZakat ? 'Zakat Due' : 'Below Nisab'}
            </span>
          </div>
        </div>
      </div>

      {/* 8 Quranic Recipient Categories */}
      <div className="bg-white dark:bg-deen-charcoal-card p-4 rounded-2xl border border-emerald-900/10 dark:border-emerald-800/20 shadow-sm space-y-2.5">
        <h3 className="text-xs font-bold text-deen-forest dark:text-deen-ivory uppercase tracking-wider">
          Eligible Zakat Recipients (Surah At-Tawbah 9:60)
        </h3>

        <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
          {ZAKAT_RECIPIENTS_QURAN.map((rec, idx) => (
            <div key={idx} className="p-2 rounded-xl bg-stone-50 dark:bg-deen-charcoal/60 border border-stone-100 dark:border-stone-800">
              <span className="font-semibold text-deen-forest dark:text-deen-ivory block">{rec.category}</span>
              <span className="text-[11px] text-stone-500">{rec.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
