import React, { useState } from "react";
import { Plus, Edit2, Trash2, Download, Save, X, LogOut } from "lucide-react";

const AmmoCalculator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    bolme: "",
    silahNovu: "",
    sursatMarkasi: "",
    heyetinSayi: "",
    calismaninNovu: "",
    illikTelimSayi: "",
    birCalismaUcunSursat: "",
    qeyd: "",
  });

  const atisCalismalari = {
    "AK-74": {
      "1-ci TAÇ": { sursat: "5.45 mm PS\n5.45 mm T", miqdar: "9\n3" },
      "2-ci TAÇ": { sursat: "5.45 mm PS\n5.45 mm T", miqdar: "18\n6" },
      "3-cü TAÇ": { sursat: "5.45 mm PS\n5.45 mm T", miqdar: "21\n9" },
      "4-cü TAÇ": { sursat: "5.45 mm PS\n5.45 mm T", miqdar: "22\n8" },
      "1-ci NAÇ": { sursat: "5.45 mm PS\n5.45 mm T", miqdar: "18\n6" },
      "2-ci NAÇ": { sursat: "5.45 mm PS\n5.45 mm T", miqdar: "15\n5" },
      "DAÇ-4": { sursat: "5.45 mm PS\n5.45 mm T", miqdar: "115\n55" },
      "DAÇ-7": { sursat: "5.45 mm PS\n5.45 mm T", miqdar: "540\n270" },
    },
    "RPK-74": {
      "1-ci TAÇ": { sursat: "5.45 mm PS\n5.45 mm T", miqdar: "9\n3" },
      "2-ci TAÇ": { sursat: "5.45 mm PS\n5.45 mm T", miqdar: "9\n3" },
      "3-cü TAÇ": { sursat: "5.45 mm PS\n5.45 mm T", miqdar: "21\n9" },
      "1-ci NAÇ": { sursat: "5.45 mm PS\n5.45 mm T", miqdar: "18\n6" },
      "2-ci NAÇ": { sursat: "5.45 mm PS\n5.45 mm T", miqdar: "15\n5" },
      "DAÇ-4": { sursat: "5.45 mm PS\n5.45 mm T", miqdar: "20\n10" },
      "DAÇ-7": { sursat: "5.45 mm PS\n5.45 mm T", miqdar: "120\n60" },
    },
    "RPQ-7": {
      "1-ci TAÇ": { sursat: "7.62 mm T-45", miqdar: "2" },
      "2-ci TAÇ": { sursat: "7.62 mm T-45", miqdar: "2" },
      "3-cü TAÇ": { sursat: "7.62 mm T-45", miqdar: "2" },
      "1-ci NAÇ": { sursat: "7.62 mm T-45", miqdar: "3" },
      "DAÇ-4": { sursat: "7.62 mm T-45", miqdar: "5" },
      "DAÇ-7": { sursat: "7.62 mm T-45", miqdar: "18" },
    },
    PK: {
      "1-ci TAÇ": { sursat: "7.62 mm LPS\n7.62 mm T-46", miqdar: "9\n3" },
      "2-ci TAÇ": { sursat: "7.62 mm LPS\n7.62 mm T-46", miqdar: "18\n6" },
    },
    SVD: {
      "1-ci TAÇ": { sursat: "7.62 mm LPS\n7.62 mm T-46", miqdar: "4\n2" },
      "2-ci TAÇ": { sursat: "7.62 mm LPS\n7.62 mm T-46", miqdar: "6\n2" },
      "3-cü TAÇ": { sursat: "7.62 mm LPS\n7.62 mm T-46", miqdar: "7\n3" },
      "8-ci TAÇ": { sursat: "7.62 mm LPS\n7.62 mm T-46", miqdar: "8\n4" },
      "1-ci NAÇ": { sursat: "7.62 mm LPS\n7.62 mm T-46", miqdar: "9\n3" },
      "2-ci NAÇ": { sursat: "7.62 mm LPS\n7.62 mm T-46", miqdar: "12\n3" },
      "DAÇ-4": { sursat: "7.62 mm LPS", miqdar: "45" },
      "DAÇ-7": { sursat: "7.62 mm LPS", miqdar: "45" },
    },
  };

  const silahNovleri = ["AK-74", "RPK-74", "RPQ-7", "PK", "SVD"];

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === "Elvar" && loginForm.password === "42314") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("İstifadəçi adı və ya şifrə yanlışdır!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ username: "", password: "" });
    setRecords([]);
    setFormData({
      bolme: "",
      silahNovu: "",
      sursatMarkasi: "",
      heyetinSayi: "",
      calismaninNovu: "",
      illikTelimSayi: "",
      birCalismaUcunSursat: "",
      qeyd: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "silahNovu") {
      setFormData((prev) => ({
        ...prev,
        calismaninNovu: "",
        sursatMarkasi: "",
        birCalismaUcunSursat: "",
      }));
    }

    if (name === "calismaninNovu" && formData.silahNovu) {
      const calisma = atisCalismalari[formData.silahNovu]?.[value];
      if (calisma) {
        setFormData((prev) => ({
          ...prev,
          sursatMarkasi: calisma.sursat,
          birCalismaUcunSursat: calisma.miqdar,
        }));
      }
    }
  };

  const calculateTotal = (heyetSayi, illikTelim, birCalismaSursat) => {
    const miqdarlar = birCalismaSursat
      .split("\n")
      .filter((m) => m.trim())
      .map((m) => Number(m) || 0);
    const totals = miqdarlar.map(
      (m) => Number(heyetSayi) * Number(illikTelim) * m,
    );
    const grandTotal = totals.reduce((sum, t) => sum + t, 0);

    return {
      totals: totals,
      grandTotal: grandTotal,
    };
  };

  const handleSubmit = () => {
    if (
      !formData.bolme ||
      !formData.silahNovu ||
      !formData.sursatMarkasi ||
      !formData.heyetinSayi ||
      !formData.calismaninNovu ||
      !formData.illikTelimSayi ||
      !formData.birCalismaUcunSursat
    ) {
      alert("Məcburi xanaları doldurun!");
      return;
    }

    if (editingId) {
      const result = calculateTotal(
        formData.heyetinSayi,
        formData.illikTelimSayi,
        formData.birCalismaUcunSursat,
      );
      setRecords(
        records.map((record) =>
          record.id === editingId
            ? {
                ...formData,
                id: editingId,
                cem: result.grandTotal,
                cemTotals: result.totals,
              }
            : record,
        ),
      );
      setEditingId(null);
    } else {
      const result = calculateTotal(
        formData.heyetinSayi,
        formData.illikTelimSayi,
        formData.birCalismaUcunSursat,
      );
      const newRecord = {
        ...formData,
        id: Date.now(),
        cem: result.grandTotal,
        cemTotals: result.totals,
      };
      setRecords([...records, newRecord]);
    }

    setFormData({
      bolme: "",
      silahNovu: "",
      sursatMarkasi: "",
      heyetinSayi: "",
      calismaninNovu: "",
      illikTelimSayi: "",
      birCalismaUcunSursat: "",
      qeyd: "",
    });
  };

  const handleEdit = (record) => {
    setFormData({
      bolme: record.bolme,
      silahNovu: record.silahNovu,
      sursatMarkasi: record.sursatMarkasi,
      heyetinSayi: record.heyetinSayi,
      calismaninNovu: record.calismaninNovu,
      illikTelimSayi: record.illikTelimSayi,
      birCalismaUcunSursat: record.birCalismaUcunSursat,
      qeyd: record.qeyd,
    });
    setEditingId(record.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bu qeydi silmək istədiyinizə əminsiniz?")) {
      setRecords(records.filter((record) => record.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      bolme: "",
      silahNovu: "",
      sursatMarkasi: "",
      heyetinSayi: "",
      calismaninNovu: "",
      illikTelimSayi: "",
      birCalismaUcunSursat: "",
      qeyd: "",
    });
  };

  const getSursatSummary = () => {
    const summary = {};

    records.forEach((record) => {
      const sursatlar = record.sursatMarkasi
        .split("\n")
        .filter((s) => s.trim());
      const miqdarlar = record.birCalismaUcunSursat
        .split("\n")
        .filter((m) => m.trim());

      sursatlar.forEach((sursat, index) => {
        const trimmedSursat = sursat.trim();
        const miqdar = Number(miqdarlar[index]) || 0;
        const heyetSayi = Number(record.heyetinSayi) || 0;
        const illikSayi = Number(record.illikTelimSayi) || 0;
        const toplam = heyetSayi * illikSayi * miqdar;

        if (!summary[trimmedSursat]) {
          summary[trimmedSursat] = { total: 0, perSession: 0 };
        }
        summary[trimmedSursat].total += toplam;
        summary[trimmedSursat].perSession += miqdar;
      });
    });

    return summary;
  };

  const exportToExcel = async () => {
    // SheetJS kitabxanasını yüklə
    const XLSX =
      await import("https://cdn.sheetjs.com/xlsx-0.20.1/package/xlsx.mjs");

    // Workbook yarat
    const wb = XLSX.utils.book_new();

    // ========== ƏSaS CƏDVƏL ==========
    const wsData = [];

    // Başlıq məlumatları
    wsData.push(["DÖVLƏT SƏRHƏD XİDMƏTİ"]);
    wsData.push(["Sursat Hesabat Cədvəli"]);
    wsData.push(["Tarix: " + new Date().toLocaleDateString("az-AZ")]);
    wsData.push([]); // Boş sətir

    // Cədvəl başlıqları
    wsData.push([
      "S/S",
      "Bölmənin adı",
      "Silahın növü",
      "Döyüş sursatlarının markası",
      "Stat üzrə şəxsi heyətin sayı",
      "Çalışmanın növü",
      "İl ərzində keçiriləcək təlim atış çalışmasının miqdarı",
      "Bir çalışma üçün ayrılan döyüş sursatının miqdarı",
      "Cəmi tələb olunur",
      "Qeyd",
    ]);

    // Məlumatları əlavə et
    records.forEach((record, index) => {
      const sursatlar = record.sursatMarkasi
        .split("\n")
        .filter((s) => s.trim());
      const miqdarlar = record.birCalismaUcunSursat
        .split("\n")
        .filter((m) => m.trim());
      const cemler = record.cemTotals || [record.cem];

      const maxRows = Math.max(
        sursatlar.length,
        miqdarlar.length,
        cemler.length,
      );

      for (let i = 0; i < maxRows; i++) {
        wsData.push([
          i === 0 ? index + 1 : "",
          i === 0 ? record.bolme : "",
          i === 0 ? record.silahNovu : "",
          sursatlar[i] || "",
          i === 0 ? record.heyetinSayi : "",
          i === 0 ? record.calismaninNovu : "",
          i === 0 ? record.illikTelimSayi : "",
          miqdarlar[i] || "",
          cemler[i] || "",
          i === 0 ? record.qeyd || "" : "",
        ]);
      }
    });

    // Ümumi cəm
    const totalCem = records.reduce((sum, r) => sum + Number(r.cem), 0);
    wsData.push([]);
    wsData.push(["", "", "", "", "", "", "", "CƏMİ:", totalCem, ""]);

    // Worksheet yarat
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Sütun genişliklərini təyin et
    ws["!cols"] = [
      { wch: 5 }, // S/S
      { wch: 20 }, // Bölmə
      { wch: 12 }, // Silah
      { wch: 20 }, // Sursat markası
      { wch: 15 }, // Heyət sayı
      { wch: 15 }, // Çalışma
      { wch: 25 }, // İllik təlim
      { wch: 20 }, // Bir çalışma
      { wch: 15 }, // Cəm
      { wch: 15 }, // Qeyd
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Əsas Cədvəl");

    // ========== SURSAT ÜZRƏ CƏMİ ==========
    const summaryData = [];
    summaryData.push(["SURSAT NÖVÜ ÜZRƏ CƏMİ"]);
    summaryData.push([]);
    summaryData.push(["Sursat Markası", "Bir çalışma üçün", "Ümumi Cəm"]);

    const summary = getSursatSummary();
    Object.entries(summary).forEach(([sursat, data]) => {
      summaryData.push([sursat, data.perSession, data.total]);
    });

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
    wsSummary["!cols"] = [{ wch: 25 }, { wch: 20 }, { wch: 20 }];

    XLSX.utils.book_append_sheet(wb, wsSummary, "Sursat üzrə cəmi");

    // Excel faylını yüklə
    XLSX.writeFile(
      wb,
      `DSX_Sursat_Hesabat_${new Date().toLocaleDateString("az-AZ").replace(/\./g, "_")}.xlsx`,
    );
  };

  const totalCem = records.reduce((sum, record) => sum + Number(record.cem), 0);
  const sursatSummary = getSursatSummary();
  const availableCalismaTypes = formData.silahNovu
    ? Object.keys(atisCalismalari[formData.silahNovu] || {})
    : [];

  // Login səhifəsi
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white text-4xl font-bold py-3 px-6 rounded-lg inline-block mb-4">
              DSX
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Dövlət Sərhəd Xidməti
            </h1>
            <p className="text-gray-600">Sursat Hesablama Sistemi</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İstifadəçi adı
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="İstifadəçi adınızı daxil edin"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Şifrə
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Şifrənizi daxil edin"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Daxil ol
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Əsas proqram
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Dövlət Sərhəd Xidməti
              </h1>
              <p className="text-gray-600 mt-1">Sursat Hesablama Sistemi</p>
            </div>
            <div className="flex gap-3">
              {records.length > 0 && (
                <button
                  onClick={exportToExcel}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                  <Download size={20} />
                  Excel Yüklə
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md"
              >
                <LogOut size={20} />
                Çıxış
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bölmənin adı <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="bolme"
                value={formData.bolme}
                onChange={handleInputChange}
                placeholder="Məs: ÇHB, MTTB"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Silahın növü <span className="text-red-500">*</span>
              </label>
              <select
                name="silahNovu"
                value={formData.silahNovu}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seçin</option>
                {silahNovleri.map((silah) => (
                  <option key={silah} value={silah}>
                    {silah}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Çalışmanın növü <span className="text-red-500">*</span>
              </label>
              <select
                name="calismaninNovu"
                value={formData.calismaninNovu}
                onChange={handleInputChange}
                disabled={!formData.silahNovu}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="">Seçin</option>
                {availableCalismaTypes.map((calisma) => (
                  <option key={calisma} value={calisma}>
                    {calisma}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stat üzrə şəxsi heyətin sayı{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="heyetinSayi"
                value={formData.heyetinSayi}
                onChange={handleInputChange}
                placeholder="Məs: 38"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                İl ərzində keçiriləcək təlim atış çalışmasının miqdarı{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="illikTelimSayi"
                value={formData.illikTelimSayi}
                onChange={handleInputChange}
                placeholder="Məs: 4"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Döyüş sursatlarının markası
              </label>
              <textarea
                name="sursatMarkasi"
                value={formData.sursatMarkasi}
                readOnly
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                placeholder="Avtomatik doldurulacaq"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bir çalışma üçün ayrılan sursatın miqdarı
              </label>
              <textarea
                name="birCalismaUcunSursat"
                value={formData.birCalismaUcunSursat}
                readOnly
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                placeholder="Avtomatik doldurulacaq"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qeyd
              </label>
              <input
                type="text"
                name="qeyd"
                value={formData.qeyd}
                onChange={handleInputChange}
                placeholder="Əlavə qeydlər"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-4 flex gap-2">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                {editingId ? (
                  <>
                    <Save size={20} />
                    Yadda saxla
                  </>
                ) : (
                  <>
                    <Plus size={20} />
                    Əlavə et
                  </>
                )}
              </button>
              {editingId && (
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors shadow-md"
                >
                  <X size={20} />
                  Ləğv et
                </button>
              )}
            </div>
          </div>
        </div>

        {records.length > 0 && (
          <>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="border border-gray-600 px-2 py-3 text-xs">
                        S/S
                      </th>
                      <th className="border border-gray-600 px-2 py-3 text-xs">
                        Bölmənin adı
                      </th>
                      <th className="border border-gray-600 px-2 py-3 text-xs">
                        Silahın növü
                      </th>
                      <th className="border border-gray-600 px-2 py-3 text-xs">
                        Döyüş sursatlarının markası
                      </th>
                      <th className="border border-gray-600 px-2 py-3 text-xs">
                        Stat üzrə şəxsi heyətin sayı
                      </th>
                      <th className="border border-gray-600 px-2 py-3 text-xs">
                        Çalışmanın növü
                      </th>
                      <th className="border border-gray-600 px-2 py-3 text-xs">
                        İl ərzində keçiriləcək təlim atış çalışmasının miqdarı
                      </th>
                      <th className="border border-gray-600 px-2 py-3 text-xs">
                        Bir çalışma üçün ayrılan döyüş sursatının miqdarı
                      </th>
                      <th className="border border-gray-600 px-2 py-3 text-xs">
                        Cəmi tələb olunur
                      </th>
                      <th className="border border-gray-600 px-2 py-3 text-xs">
                        Qeyd
                      </th>
                      <th className="border border-gray-600 px-2 py-3 text-xs">
                        Əməliyyat
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((record, index) => (
                      <tr key={record.id} className="hover:bg-blue-50">
                        <td className="border border-gray-300 px-2 py-2 text-center text-sm font-semibold">
                          {index + 1}.
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">
                          {record.bolme}
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">
                          {record.silahNovu}
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-sm whitespace-pre-line">
                          {record.sursatMarkasi}
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-center text-sm">
                          {record.heyetinSayi}
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">
                          {record.calismaninNovu}
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-center text-sm">
                          {record.illikTelimSayi}
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-center text-sm whitespace-pre-line">
                          {record.birCalismaUcunSursat}
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-center font-bold text-blue-600 text-sm">
                          <div className="flex flex-col">
                            {record.cemTotals &&
                              record.cemTotals.map((total, idx) => (
                                <div key={idx} className="py-0.5">
                                  {total}
                                </div>
                              ))}
                          </div>
                        </td>
                        <td className="border border-gray-300 px-2 py-2 text-sm">
                          {record.qeyd || ""}
                        </td>
                        <td className="border border-gray-300 px-2 py-2">
                          <div className="flex justify-center gap-1">
                            <button
                              onClick={() => handleEdit(record)}
                              className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(record.id)}
                              className="p-1 text-red-600 hover:bg-red-100 rounded"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-800 text-white font-bold">
                      <td
                        colSpan="8"
                        className="border border-gray-600 px-2 py-3 text-right"
                      >
                        CƏMİ:
                      </td>
                      <td className="border border-gray-600 px-2 py-3 text-center text-lg">
                        {totalCem}
                      </td>
                      <td colSpan="2" className="border border-gray-600"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Sursat növü üzrə cəmi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(sursatSummary).map(([sursat, data]) => (
                  <div
                    key={sursat}
                    className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-600"
                  >
                    <div className="text-sm text-gray-600 mb-1">
                      Sursat Markası
                    </div>
                    <div className="text-lg font-semibold text-gray-800 mb-2">
                      {sursat}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      Bir çalışma üçün: {data.perSession} ədəd
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {data.total.toLocaleString()} ədəd
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Ümumi Cəm</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {records.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">
              Məlumat əlavə etmək üçün yuxarıdakı formu doldurun
            </p>
            <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg inline-block text-left">
              <p className="font-semibold mb-2">Təlimat:</p>
              <p>1. Silahın növünü seçin (AK-74, RPK-74, RPQ-7, PK, SVD)</p>
              <p>2. Çalışmanın növünü seçin</p>
              <p>3. Sursat və miqdarlar avtomatik doldurulacaq</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AmmoCalculator;
