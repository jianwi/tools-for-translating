export default async function en2ch(en: string):Promise<string> {
    let res = "";
    const req = await fetch("http://f.jialidun.vip/t.php", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `q=${en}`,
    });
    if (req.ok) {
      const text = await req.text();
      const data_json = JSON.parse(text);
      // console.log(data_json)
      if (data_json) {
        for (const r of data_json.trans_result) {
          res += r.dst + "\n\n";
        }
      }
    }
    return res;
  }