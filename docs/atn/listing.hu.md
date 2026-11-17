# ATN-leírás — magyar

<!-- VÁRAKOZIK (2026-11-17): az addons.thunderbird.net jelenleg nem fogad új, saját Experiment
API-t használó kiegészítőt; a webext-linter "experiment-not-allowed" hibával utasítja el. Addig
GitHub Releases-en keresztül terjesztjük. Feltöltés előtt vedd ki az update_url-t a
manifest.json-ból, és csomagold újra. -->

## Név

Star Highlight

## Összefoglaló

<!-- ATN-korlát: 250 karakter. Ez: 160. -->

Háttérszínnel emeli ki a csillagozott (megjelölt, angolul starred / flagged) üzeneteket a
Thunderbird üzenetlistájában. Külön szín a világos és a sötét témához.

## Leírás

Egy hosszú üzenetlistában a csillagozott üzenetek könnyen elvesznek: csak egy kis csillag jelzi
őket egy oszlopban. A Star Highlight az egész sort háttérszínnel emeli ki, így első ránézésre
látszik, melyik üzenet csillagozott.

**Mit csinál**

- Kiemeli a csillagozott (megjelölt) üzeneteket az üzenetlistában, Táblázat nézetben és
  Kártyanézetben is
- Külön szín világos és sötét témához; hogy melyik érvényes, azt a Thunderbird témája dönti el
- Igény szerint félkövér betű a csillagozott üzeneteknél
- A kijelölt üzenet megtartja a Thunderbird saját kijelölési színét, így mindig látszik, hol állsz
- A beállítások változása azonnal megjelenik, újraindítás nélkül
- A kiegészítő letiltásakor vagy eltávolításakor a kiemelés azonnal eltűnik

**Beállítások**

Kiegészítők és témák → Star Highlight → Beállítások: a kiemelés be- és kikapcsolása, a két szín
kiválasztása (mindkettőhöz előnézettel) és a félkövér betű.

**Nyelvek**

Magyar, angol, német, francia, orosz és japán. A kiegészítő a Thunderbird nyelvét követi, és
minden nyelven ugyanazt a szót használja a csillagozott üzenetekre, mint maga a Thunderbird.

**Miért kér teljes hozzáférést**

Egyetlen szabványos kiegészítő-API sem tudja megváltoztatni az üzenetlista kinézetét, ezért a
Star Highlight egy kis Experiment API-t használ, és a Thunderbird minden ilyen kiegészítőnél
teljes hozzáférést kér. Az Experiment csak annyit csinál, hogy egy stíluslapot regisztrál az
üzenetlistához, majd eltávolítja. A Star Highlight nem olvas üzeneteket, nem küld semmit sehová,
és csak a saját beállításait tárolja.

**Kompatibilitás**

Thunderbird 115 és újabb.

## Képernyőképek

<!-- Ebben a sorrendben töltsd fel az ATN-re; a fájlok a docs/screenshots/ mappában vannak, 1280×800. -->

1. table-view.png — A csillagozott üzenetek kiemelve Táblázat nézetben; a kijelölt üzenet megtartja a Thunderbird kijelölési színét.
2. cards-view.png — Ugyanez Kártyanézetben.
3. dark-theme.png — Külön szín sötét témához.
4. settings.png — Be- és kikapcsolás, a két szín kiválasztása előnézettel, félkövér betű.

## Kategóriák

<!-- Az ATN-en kell kiválasztani; javaslat: -->

- Appearance (Megjelenés)
- Message and News Reading (Üzenetek és hírek olvasása)

## Címkék

starred, flagged, flag, star, highlight, csillag, csillagozott, kiemelés, üzenetlista
