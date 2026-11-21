
'use strict';
const C={cyan:'#00E5FF',red:'#FF3B5C',violet:'#A855F7',amber:'#FFD166',silver:'#E5E7EB'};
const $=s=>document.querySelector(s);
/* ---------- تنظیمات و صدا ---------- */
const S={sound:true,grid:true};
/* لرزش (اندروید): الگوی ms یا عدد؛ با گزینهٔ تنظیمات خاموش می‌شود */
/* آیکون‌های نئونی دکمهٔ صدا (روشن / خاموش) */
const SND_ON='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAhVUlEQVR42u2de5DkWVXnP+fe3y9f9Z4qiqaHhhZoH8NDYBTCGEMRwVVEQAFDYGNdAsUHi+uCuqyGuGy4gBJC+EBUNCBUQIVBBBkBhZhBjXVFRJARoYelmWaanp7qqWe+fr9779k/7s2srK6sqqzqKpiuyTPxi5yszP7l7957nt977jkwpjGNaUxjGtOYxjSmMY1pTGMa05jGNKYxjWlMYxrTmMY0pjGNaUxjOoYk4ynYgVQlzY8iomMGuH8sugFywABwEcMJADzgAH/cmMGMVz1Ju2rORepA4Dx1VjnJDPNcQngnJVADakkzjDXAMVLzFtLCL2GY9M+TTJ6P04cjKCJfUvgInfKPmK6eT/+yg0gYS861zwA5KzqH6hQb3cdJ4d8rqiqqKj5dvfel/yyt4lv4gtZQnUzmYkzXrK1XrXG3TqI6Sdu9WEp/UVRVWqVLV5B26aVVemmVhaiqdN15uvoYVGdQrYwn8tq09Rmq06jWuEdPSuHfLKoqTlWapZO207T4Tlqll7bT9LfIBK3i3dyjU6hOHDd/4P6w+DWWdRbVKZrlM6Vwn05S76VZhLTQXjp+U/V3vPaZouuDtMs2zeLGZArycRRwrUg9TACG5pqVjvt5yc3N5PaRtJxHxGCMoOqpZwZRrx33du24t2FwCCAi+KDUshrGPJYSTQ7kNU3Z/cDLrwANlnA0eJQsTr6G3DyZjldKFzBiUQ2AUM8sLnxSvf81kDsiAqBfT83eSNuF5Pkbgj6cM8hxiKLMMZb6XniXs4ow4V8ilfAhcvNk2s6jCkYMQT3VzFDNhG54szrzHKjcSpYXBO2g4d7eXdGEARlT4ywKyJH6AV8BHyM7plKfscIEHUoanJRG+N/k9jmUCm3nEbGoKuBpZJbSf1E9v4y370ewgOK5jA2C5sPifUeRGOBoNZflc+o5kxgQ3GHjD+ZYSv1l6szSZcZ/nzTCB8nNc2g7j/OaFt+TWaFmLV33Dm3bp9Kx7wKUBk1KWng61GrtNPFbKQSlcqQmIIaY51YqPJhFLpEDlstMpjGOGWCIxFhgCqhi2nPSCa+WTN6ONaeToxcnLqinnlkIa9otX6Gd7L/gucQsngmWgTYzlCgBGC5txpgklUcxlhoAa+WNcmr6XZKFj8g876HJk5mny/LyJKr5OAS9EtRRnUO1Qbt8qpT+4ym8C/1YvveqqtL1t7JWfBsreh1r+oAU02fpXgbVKho/k7a7ZQAgKkVVaftfS9+ZPNSFiFqswYo+QpruzohA9pHIdZrls1L4OXdYIai5pqU+hncNIOccStv/pFjzbjLzeFqlR0SQ5OjVM4PFUYTX6L2tH2Qq/wQzOKZYBTrEnb6ep+8BT8ARwnATcO5ITIABOlT8E2jYU7RdSemUtnMgk5LL21h0Twc8q4djDsw1u/jRu59mCWGjeIhcH/5A6vZ1qEzSKgPGWEJQVAONzOLCZzToc3XdvJYTk2Va5CZQInLlNq8CgRkcYsohJgBOcwTbwu+ML6KXCMQoBUAko3ABMQ3JzVtpuafQpgAa9789iSj59YToTdN2L5LS3zWgpnuInhPXQ/PKt7HWuYF7dSapz+quE6dquEenuEenpO3+fJsJaJZHaQJqqE5Ks/zDzd/tw9FxTIW7TLN4Indpg3vumboaJjDX2MJbLjHBecC3JqUMr5OK/X3EnNzi6Gly9EL4shb+R7TIfhqpLjGHAutAsWc4tYCygOyA9ilnj2ykniVEW9lLtO1+k3pmEfVJE1gK58ntdZLZP2KKh5AtWKByUEY018jiG85TAyZp4XgA3yIztfeSmxdTuEDRR/Q81kRErwh/qYX5Xpr2XUwRWGYdaCLiRs7qWUbQIENMwNFkBcXncixQsICwlP132u5N1DJLzEiKTNBynoo5I5n/bWbJgepBMR1zTUj9EhNMUmGdCg/yPyc2vJ/MPI5W6UFMdPRClHpDU7v+F7VrXsgE55hDgHVO0UXE72c5mEOQIVMUgpAfEQYQmaAEuswyoT57FR3/Tmo2Q5MmMGLpeEfdfget8DPp+/WDmAJzn5Z6qLDCFAuUmPKM1MI7pGpfRaDWd/RUA6jSyC1F+L/qwrOo2t9kCgWKpPLLAyBoyiqywxxFDbC0dFRMEICSKVpxKuzL6fq/pp7ZPhOoWgrvJdeX0eVJXMBxYf8pa+Y+KvUxvFtlAkXp+OdLw76f3HwnbecJQTEmhne1zJAZpQhv0I3uc2lnH2MlSX1M3TpoIqeg6b9hnwEsLBwketkPE3SZjMikqv1xOu6z1DJL0ICI4FTIbCbBv5aTzHGSfL+mwNzn1H3Myp3gEmA4IQ3321Kzf4Axi30cPyJ6Mbzz4f9pMM/TNfNL2HqTEs8sG/3w7mpoNrHBzmGgjszQEeGrolpPDD4KE3igwzQFNe5ReCnOt8gEVBUjho7z1O2jpeN+igspeXUfpsAc0UKOevWQt7jwl6gDDc5TMMN3Si38BdXs+bRdoOsGcPxMaGSGwr9bO+4ZrPMBcnJmaLFIm8NK317FoENsfQijgUCbmzqGsygr1BBpAyYxwijz74E2kNHJPqZF+FUq1iB9mNpQhICRlzDLo5M/MDJUbK5ysePiRWy6hmqDmHixeV264v8vXZoAGunvDWAyYfhT5GnD44G8Soy/mcw8IiF6BtmC4y9L179cu/bH8JULzBOYYQ2So3dYufszKAyNAsJI0h+1mdLltHxNeLNMhg9IqW9krXuaixhg77SyOJYIWhksE/nv0Pa3RlMQQj9RpWInRPzPcZkKS1Q40lyFXh59BEIaScVliasnuEsbWy7tX/X0vp6uBvfqDGu6wLLO0ipuko77P6Kq0nabOH5zIE2r6z5Kq7iJJZ1mVefTfewhj8+gOoXqddJ279++F1D+Kp/bAwiK92ig+gBplf8kqiohAVOFv4Nm8cSB+TMjPJPtz1dLb5KuW5eu933gq+O8dJ2nUz4zPftIDmF2oMm5QI2TZICjzQLGPQbkBlGdJ2CY7UuJEIKhg4JRQoDrjNJBkmQJdWMhGCqmipofompnktRbRIQQPI3cUvpCi/A6SvtGJmyLLoZp1jmCPfI+rSFp2/cKE4AdISPIAiVN903Usxsjno8BPPXs4QJ/ok2ezQSfSyFce9dxiHhUuxiq1PmUtvXNUrf/jXbwgCWoUs+stP2LdJWPEpYNc3PFXpoq2/fiX6LBSTzrXE81vEhyfgDJvmbn7Dgz+v+XQMtt4vhCCu/8v6nqz1C1t9GmxkUcJ+gA4ciOai0l661XpUoVk61QBhAxaaCGtnPUs9Pi3Vu0nT2dDmvMkaNa7DGewAxt1pig6n+frjybSnYq7hNg6HrF8B+Y4LEszf1jMkHdw/EBojppsIjSct8j9fBXUjEvx5ivoXBK2/mrvpzTzTStXKhmhq57q3bcs1jN/haoMEOLE1cV3o1GC8A0AYbsBhpG8QE8kFHnkwR9DzVrUHX9zZ22c9Syxwj+DQCsUGevJNMeUhjwtKsXNIQ3YXtxigheA1VbkdL9J05guEx1LzNg9rH4NSDQ9s+QivwJ1jyUtnN0XXRE4r1kx0sERNjh897fA6oxTSuEu7Xrf0KL7GeR6jKLAGwkHN/zlaBVQEwYIodRupeWdpf+yARWsT9N13+QeraJ5olkCc17NlX3cjp9NE/2ZKxZOggGyf+MtvtCYq6oBZyCyNPZ4DTzhL2YalQNkAFCl9Ni+A3E5ikmzxCJP17NhHpmdrxq1lKzdofP7cCrpQi3aGmeSWnfBQhTbACthON/Jc/kyQ5ybvb0sje990DBum7YF9ENH9mO5gUvubyCWW5KeP/uUtvTAroSWOMSYv4YI5HhRITSe2p2Aeu/O/3+rhtF2YjSn3MrBU90L6WeLdByDiMZChiBmjV03AXgrhjjYtNCJVWpgIStTKcklRDSwIVcCnX6Htr2rRhsVME0j9TR2z0MDLR3+OwcwukF3RPNU+0yg2Edo2J+Wgp/M7XsDG0XMGLwAepZLs6/Wjfs05ikDbe6/ubPTr7A7GyHFWoazC3S8T9FZmdwvvc8KsIzFd6SfADZyWRlI0kBBB7LKYFn4dGUORvlwxC0G96E6juQ/O7omGEBj+JQPA2U5gCGLokJItAakqtl6FIwwzqrVFmkSG6h+6qcyV9agmwh7rMNk//TI2cFRzRvCsMaF9ToTwr+3eRmAhciuNV2PkYK/oWcs7/O6SfVUG3tyPSRsVy6++cxfIhcnouLaSQUKsCNtMuvZzX/BCcw7JDfOIoJiKFL7m4gtycofDwlo+qpWdEy3IyaN2DyJQJtSjYoWKbLKgUbFLRYpsUELQraTNCiS5MGTSZoUtJhkoIJ2sxQABmLdIhpWu6rV5BhAWSnBTYM8WH2MgVRl7Syf1AXXkluzMACCy6oiL6MkzyCZSxn2SvnLzCLY4pSDTdTBgVMBIa8p2ZrGPPtnMDRyzI+MAOcxWBkGivQPx2RBm7krwl08GzQpckUTaZZZ4Y1ZthgliZzNIGN9Npkjo3k0LX6n0VV30obOC7l5321qnHoFds+27Xi+b5a3fsZe3mG07Sor9cp8z+kVX6Imo3+gIihDIFatoh3P0JAOUNlV4Cot2O4hiXYj+HCHdQySaeceo/+HazSAOxO9xqNAc5cMSlbPrUd2mxQ0mGObtqCLdMilulyKWzrvfqB94NXuI+UYBEWdhc+Tu0zJzBGLiVTUy2UoJX8tZShhTWSDqmYqAXkBdSKh3P5srD32UNPwFPjshpuS8ya7gUEfTx1Hsqlnc8xmpEmAwzWylCJ8B7mccwke32c6ujM7Lj+yjng8r4zg30SEFjl41qGt1MxJgFaErWAXTDGPp35+SIBOXuZgZJlIMhHiT5gNAOFU2rZHN4/mkXcTmttRlSHgvf5DnqgV1ApcLyKKPUSQmToZ6cJzO9bC2iK4wvmgSx7Ex23RmYMqj3MURV9FjDBEnaPfY54vzks1n6Cwt9NJZO0VewRENVv5FyCpoeEg6MxwEUEu+N3lfMoJzhepdSWEGZ2SAcBOIuwdGD/ogAM69wBvI/cpHBYLB0PmflGuu4JLOB2WrgrtAp0uYiRTyVFH/r/xsgNTKajZUOYeTQTEFA8fkc1dKoXyh2jEmoLPSRwaEKIcqb/94NogejAWYwaeR9l0LRXAKqB3FgJPJVYkirf2RXt38szRaEqn94GYql+HRNc19fkB0ICT6L9OFKGcnTY90RcKz7AsKxgEG4npo4fyMWUABTMYgj24zj9d6o2evAivaX6Nq5jdifJvQKYLllCCfrZAb9NKBXgFPDQ9D1zUB9g8J2M9L3jQKs7TtFhJFtEpLTGJUQ+1PfgVQ2lgvJITPmw3n7CnvdaAIzeQceXGBMf2jmlluXgH8qF5AccyASc33WBwzFlgCiHO6R78MjkJ1zd/UsuETSY23ADHrz3gXpWQ8w3pMhqZz9g0wwIkt2F6j3kpoe0h/SED05a/EAaICoRa3WXMPFYlEvZNq6ZXbOCe1jBwcYdzYBjEcHz75R+qe/B9xBC1cekNdpbA1wGHKvApbRVpQPOwIP74fwVjGT2NSH3N9rJCTw88ixjoi6Rzydr3/fgxcgZVqmNIGDxGUvaoF/erpHlQeyw72P2pQ53Yoyzx1ADXO5b5aMcV2AOpUmLoHcMLFsPEbienEZiErPr+syjODwi9wz5fJrVtKV/YCfQ+8Hg4vjT/JaluGLZgh6qM1gSlOSmSRK2kJ7C0kiHWs2e67RAQONpov594kfTWPLE1Gb/TuDgfvKw5T8z4qbItQUE0bebwyb7LHD5UBxN5RQGkUtbNE4AkAbCZPodM0K2kAxsvA9+dwJzcBOgnNsVBziOPoIOxPjbGTtLp4PnuboklZ4HfxEQNrbMY9BYL0iYYL63pLsCbZGZTGKArT9UQbDDoOvRfIDBahg65IdvP3YGQHaNAgIygARePZUEPFsrkcRd9wzvaiNq17hXr1LsocX1ICZgd2l55DH1C1Z3GfvZQ9B4vbY0pwjYHbSJ24fWurAFlxlm1rY566PvBo7ihBw/PTA8uglBUo7EYZk9sy1MixnUDqud6I+c3X3uLwInCWZ49o9H8cNwi9FxAGvNjtN0+7HDCKKqnEZ31YoxLfzqGP9irzEVjS2CZASEFkHXIyOe2Z1VY28jUZHJIZ920D7msG8fYDD9qceZg4wBjzyWBmDnlC9jYhSwsHC15WKFExjOI6gsbmHAiP1tYCsbpKOxe2qRS1g0zPXjgc2QfQMlMLddU49mAk71DzlsL3LgvRxD9S8D7t6QgyHhME2fUCcTePD2J5AlfIrrd/+daKoWyUH6McNAHLNOwB3UCewttNnlQY7jXgDslfS5dNVjjnO6wCTomYGVT78pd1LSHia5Q2mDCqoPHOJsXmaactg9RmOAc7t+Vw/FI76vaoLdpn3hKnCAXn3jFQzN4gSqZ6KOVdP7VSV8jtn+wukejCRkNJA+gtFfEzXcxUX8wcPA0wMcKGz3AY4fENQLA4dj8MYcVhRg8QTEPJzcLlD4eLxLMXGp5PaBYFB3YSTDEiFlBTwobS0L9My13MmJ4Uk7ZmRJYCDp+ErTcGbLwxwf9S+Y/imo7VpRrtIECJfJKPFiuIlMAA2oKpk1dH0TtZ/pM8DuKKCNp4LcKSrZZP+ImJh4ZFzsF+kd8LniPvsIA5Mvuv0DwyiHJa9VR3B4jSA4DcjlqxmzwSBMM4vy1L5+FQnkAvBvNLiTJcwecFDUACcAkRv6SaEAuYWg9yKc53I6rndADUDfgmz7eW85fq1neosfkCHJsJJCRNWDRQC9A7dzOHBPJDM30HGaTlr3+O42LrBO2NP+RwZYJhN43PZQUs5S8OWU1b3tPnscDtVB794NxQG2nu83w7jsGvX+415AO+i2hBxJm0ELCwcNAS0r8dipVOV55EZwqdSLiKHwHvRvMEZYpNxZ/fcbZRjqXEfQxw54ar1I4pNMspG+F/apAUQHPMcwNApUHEsYVlZikcJYzOj4mAMxOtQEHLRYdK+nkaJUy0djeBpFOtiJemoWPJ/CZ58ix+6q/rXPTBDco8nkdLT50jfJKvrPXAQuXvQH0AAD9mQwH0C2yH+VKjXsbIUVoEPJCVxSj7JFojaZSXaIs+P7+0Zj5p1V79UVi+43qxaVH6FqGwONrHpSdzMTrDGxJwJo+swkPImKNbSdBwyZNXT8Otb+C1Uy5k50hmmSbMSJMARd33KAIX0iyvNUu3+LVDvk1NLZ/6z/4JcH2GWewKX0/4tpci+k15MDDBeZp+Sre9hEWUGo7XA07GDSH+sfX8bT4LFYeS5dH+dXVckzQ8fdg83ek+aws8f4DatkVGkIfMeA+g/kYvF8gpwvJCBpqGkeVQNU8f4shgtUspMUyWHpOKWWPVmE12twv0uenSMnUGBTvUrP1MCkraM0CiGvBLoplXmqC5WqZ71rqVShw93MyTJBJwCHavlV0wizpJJ2OyGBSzJyveDNxlYVDCr4X6Bi6wPS78mwWvJ21rgTu2yYmyv3YKYcRanwKII8MuEIpleCRoPeBjvb/9EZIA70i9oJ7xDLz6D4GCOL0HFKPXuatMvvIfil/sPFn9zKvTmgRlC/2YQxs6BOySxICEzwJW3rq/k47+NGanGQ2v6KFYYalPBVzA6lFaQHBe4r7FtZmWB2tk1evph6/l2pG6kFDWTG0PH3YrM/ZIEM5lp7MH7UJrOItN2zqGdZX/1bY+n6Lnn2YXr1Cg9cIkZEUe3GhTC/Qcc/g0b2tbRKhzEZIkLLBaw1ZOYBWxSkHGDaMx4ohpt5THiLrpW/wnT1S8Akqi2+8hVDdsoHgDNG4hn++VGk33KJOmbW0+bxUjWvogwx/TseBVNyY7R0v0eTO5jHpEXbS5soBacQfqB/NBwCFWNouX+m5DM0yWJVseHzNmr8XgKBdZbV6Y9Rhi/TyGPJM1WPIIQQe/HGS+PlA4XT/lX6sHmlTh+l23xfOqWVCkPn5oXSyG+h4Onp96vESthHH2X8z/4e/ShFGmQEu1+lSs4Ec2L875DbOUpPalgdqGWWjv93TPZmMjJipRTdU/qhRP33UssWB8r1RUfSynuZpMlsLBWx240YSQtAl0WgzD6hzjybIny0X9atkknCsGULcnblQm2pFJ6kSxl8HxDivdrOYc3DRMKfUIRfpclkGshECjflCBkg0nQflR++6PPzOlLIt0qNGRDxv0nVPoa285hUE8CK4oJXsf+DJkvM4HbVdJvSnwGzEvSHCRrxGVUlt5aOW8L5D7BCTjyKrlfHAJEJArGmT0mL23XdPF8LXogP78X7u0GVPJMDXZV01TPblwqRjI4LuKBSMS+RariFpvv2NKAGB2yRMjJdQlgd4sfEWdO0QyojaIecGZCOeyM1+4wtPQ8QT8VaLcJvscxfM48Fdq8ZfCsWqHGJko7/furZ19P1IUVnIfYS4M8pKl9gNuVx7GI2swNY6Q7zVFihyRJ/ppl5FzOcQtxpCtfYBEtF4k6h3wRTbYJP/eCGi2RADUubUp8g1vxXqlkspRo/g5bzNLLHCfwlnfAbGszrabCSfIP2EfgGg0WidGhcVKLsvU2bczulPMy9gXr2vC1jikWwMzr+Niay1+Co0quJuLfttyyyIG192WYl29RAoghdleztzPXrLx5BBLXZBaOB6hR36+SWK7Zinez13kvlyyf71+b3JlGdRnU2lX6fp+V+SAr3mW2tX5sDrV9L/4+sl09Jpedn9tF8YT/jm0B1bni5eP86VCt7lIu3qGZs6GOl7cotpd1bpZOgKl13jq4+ipXU9navsvdxzme5Wydplq/uP1fvnqoqLffONN8zo5TRP9ikiSgijlj7rskiHRYpWcSlgkSe2P7MsTBQPKp3LRJYTOfjLyVOnaYALHX7YW2VT6frfovcCLUsFo82Em1my3ky881SNe9j3v8sF9ZzLl7sNV84PN+gZwKGyXcIjHAWIvo01j2Q3Gb4JKpBHdXM4sKKBv1RKpxnJhWP2i3U3QSRArN8rWTy45QDIJI1QuG7KvaN6am7RyP9o0uQDHf+trSKMQNdRzJUqywvz7Kss9ylDVrueVL6z6cGEn5TGxSbDSRKfystvSl18pxOr3IIzz+J6py0hmiA2Dm0MkLDiCpNPSmtMo6h98yFW6FZfn/qZDq7J+PG56mwsnIdy8uz0izeP1T62/6PB+5puebol9T0GWFFr0um4euk8L8vXlWcqjSL3qBDf+CFX6XlXp7MSj2pb3sVDBA7hqzswACt8vV7dgyJ96miWqWl3yql/3vpuLul9LfRLp+UTOPsSK3g45zMoNqg5V6WBGJzHgrvpVOuUOgTEgPUru0NubgAeRr0LF/QGu3uC6XwF9JibLWnRei1hf8L1vSGtDjTSUrNATXA1K4a4NN7aIDNcdSj9OocbX1E8lvyxACjLL5BdYIlnabQm6TrVqXwXpoD449tbF7Fl3UijfsY5GcMtlvrNYre6D5OCv+nUfWrSrPcrg1KvUDbvZgVnUvSsP82673m0Tv2DPKDJsCMMI5KYoRqks5KWlgZ4d/GRtktfYi0y0+KajSBPVMYn+2faer1qTH2vvoI33c5RURTNk7BLBtcBiYqn9dl8yLt+J9Awz00Bmrv96puCw+Smv1dqfvfw3IioYgTI0nbIPVgfg17QcS69zikoFf8erOU7u5lcXst51apY7CC/y1q2VYQKbNK6QsVfp5G6pC6z2Kd93FVIdovtDxPEyhYJGPDvk1L8zSKcAv1zGKtpKLLlm6pdLynYp8j9XALLfd9nKMg7sHX9wEly44dQzQckKHFj1QPuZcyBhPM4CV3r6Fuv4+Od30QSfBUjFUvr2Mt+7u0lp39ev7Xhq3oTV6UniYLGLqc1ZZ5gXb9z2F0o9+JI8LhNoWLD5Nq9k65Pvw6qzwgSe3kiFCy7ng4FGJW8NElwkZwDNq03CupZz9K2/l+x9EQPLUso11+mNL8OlXytH+w71K915az0KusFUvPlxgsLft76sKzKcLfR21gojYwYum4uBmVmxdLI9xCl+/mPEWa3N1arA6EsGH7d6TfOvbw4+zor1S5gJNOeKU0spfR8XGbVwRCCKmT2ll1+UsJOGYO3lvh2vMWN7VBh2k2MFi62T/pinmOtP0vINqinllCSB1HRWiVntx8rZjwpzww/C9Wybn9dj/gG2w6ZJuawTCNDm8aFY6mJE787SoXUZkLv0zNvIKO86ia1EMxUMkMpb9XO+E/0+Z82jwq7iNpdF+1SKGRIoWMteJbpes/tg1Kjq8hhYv/wFrxbQPgUSMxgu2HoPF+89J2t+wCBU8carzdA8Ra+q3ScUE6bjDc9VJ4lcJ3aJbPTuHk9NWin9d2vLgJSXeYpQVMMJX/i7aKH9QivJHcKPXM9LWBIrScp2KeKDXzQSnCL3C5NZVs7kR6jWnWgtAkR3bdMDtsH0DiePxDqNrYB7DXniczBijV60voZn/DBNWD2v3jwwBbfYMS2GAJwdbWaZtXahGeS+n/jUZuY6KpBoxYWmUgSI2K+UWZqf0prfIGoJnaqzRYpkZGDUNl6HbwqN3DD6YFapTuY7TdMo0sMl89swgd7eoPU7PvYA7LDE0OoT/D8TnR0/MNFmgxxQYzBC5nf6Vr3e+iG36XahY7kQaNcXQIvY2lmyS376fkJ2hv5DSpU2MWSx3p7HQsS7mwZxXvg1B09qarX9DAC3Dhk4iu48K/ahH+I1+0N7NCBfo9k+8fNRsP6BvYZNtnuPPOOi33Aincl/pQ8iCUWva7en+Y9fIpNJvX0+0+irXONwyFgtvlryVkb+rQMfdB+HhdH8hG93EsNa8f2Do/1GwocywZYDNS6AJdpk/VaNr3auGfQeFvpp4ZqtkmeFSm3se5ebJU5J1I/gJAyMws6EM2D272kD/j2KUZ4yGYsy6QMck6E5V/Zb5xbwo5r9rm31+1QYVlnWVFr+NenaHtXiilvzgg2du1Qav4sLTcLdL1Qdpu0xNXVZrux1IE0Dji5x7cMpfxYl59uFjjXp3h01qhqTdK1304hoVhcG89SKuM4WLcdtX+30v10naX6egNSf1XxpN7bTLCDCt6HU09aTruFVK41SHawEs7MUV8X6TvvBHVeso9MONJvXaZoN7PxmkW3yyl/7t+1k6rLBMzOGkWbjPjxv0THf26lKySjyfz2maEXvZRTFxd0gdT+tdK4Zt99T94Ff59rHZ6i39spF/u99ogRkI11qjRocsUj5YqP4Dz30QgQ+SzGvQjBPsRSjrMUgDdr/BZxTEDHDEj9E7a5EDJ7SgPZpIZlFtZ5wEYTlLv90Y+RhsvYwbYqg02j3BfxqZ+AL0taDcQpzNmgPsHM2gfWBrTmMY0pjGNaUxjGtOYxjSmMY1pTGMa05jGNKYxjWlMYxrTmMY0pmuK/j/EbvRswhFxPgAAAABJRU5ErkJggg==',SND_OFF='data:image/png;base64,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';
const vib=p=>{try{if(S.vib!==false&&navigator.vibrate)navigator.vibrate(p)}catch(e){}};
/* تمام‌صفحه (immersive) روی موبایل: با اولین لمس وارد می‌شود و نوار وضعیت/ناوبری را پنهان می‌کند */
const fsEl=document.documentElement,fsOK=!!(fsEl.requestFullscreen||fsEl.webkitRequestFullscreen);
const inFS=()=>!!(document.fullscreenElement||document.webkitFullscreenElement);
function tryFS(){
 if(S.fs===false||!fsOK||inFS())return;
 if(!(window.matchMedia&&matchMedia('(pointer:coarse)').matches))return;   /* فقط صفحهٔ لمسی */
 try{const r=(fsEl.requestFullscreen||fsEl.webkitRequestFullscreen).call(fsEl,{navigationUI:'hide'});
  if(r&&r.then)r.then(()=>{try{screen.orientation.lock('portrait').catch(()=>{})}catch(e){}}).catch(()=>{})}catch(e){}}
document.addEventListener('click',tryFS,true);
try{Object.assign(S,JSON.parse(localStorage.getItem('nc')||'{}'))}catch(e){}
/* ---------- i18n (EN / FA) ---------- */
S.lang=S.lang||'fa';if(S.music===undefined)S.music=S.sound;S.aiLevel=S.aiLevel||'medium';
const LANGS={
en:{mapTitle:'CHOOSE MAP',mapBack:'BACK',mapObs:'obstacles',mapRep:'repair tiles',tut:'INTERACTIVE TUTORIAL',tutAsk:'New here? Try the short interactive tutorial (about 2 minutes).',tutYes:'START TUTORIAL',tutLater:'LATER',tutNext:'NEXT',tutSkip:'SKIP',tutFin:'FINISH',tutStepOf:'STEP',tp0:'Welcome, Commander! Your goal: destroy the enemy core, or hold all 3 purple tiles for 3 turns in a row.',tp1:'Tap your Soldier (the glowing ring) to select it.',tp2:'Each unit moves 1 tile per turn. Tap the highlighted tile to move next to the enemy.',tp3:'Now press ATTACK.',tp4:'Tap the red Soldier to attack it. Moving and attacking each cost 1 action point (you get 2 per turn).',tp5:'You are out of action points. Press END TURN.',tpW:'Enemy turn…',tp6:'Your Support can heal allies. Tap the Support.',tp7:'Now press ABILITY.',tp8:'Tap your wounded Soldier to heal it.',tp9:'Capture the 3 purple tiles and hold them for 3 turns in a row to win. Obstacles block movement; repair tiles heal at the start of your turn.',tp10:'You are ready! Good luck, Commander.',map:'MAP',map_classic:'Classic',map_reactor:'Reactor',local:'2 PLAYER',host:'HOST',join:'JOIN',vsai:'PLAYER VS AI🤖',howBtn:'HOW TO PLAY',settings:'SETTINGS',
 move:'MOVE',attack:'ATTACK',ability:'ABILITY',endTurn:'END TURN',close:'CLOSE',aiThink:'AI IS THINKING...',
 player:'PLAYER',ai:'(AI)',you:'(YOU)',hold:'HOLD',hp:'HP',atk:'ATK',range:'RANGE',mv:'MOVE',cd:'CD',selectUnit:'SELECT A UNIT',
 u_soldier:'SOLDIER',u_archer:'ARCHER',u_heavy:'HEAVY',u_support:'SUPPORT',u_sniper:'SNIPER',u_core:'CORE',
 wins:'WINS',firstTitle:'WHO GOES FIRST?',firstGoes:'STARTS FIRST',whyCore:'CORE DESTROYED',whyObj:'ALL OBJECTIVES HELD ×3',
 connLost:'CONNECTION LOST',oppLeft:'OPPONENT LEFT',
 hostTitle:'🌐 HOST A GAME',hostShare:'Share this code with your opponent (WhatsApp/Telegram):',hostGen:'GENERATING CODE...',hostWait:'WAITING FOR OPPONENT TO JOIN...',
 copy:'📋 COPY',cancel:'CANCEL',err:'ERROR: ',
 joinTitle:'🌐 JOIN A GAME',joinPaste:'Paste the room code from your opponent:',connect:'CONNECT',enterCode:'ENTER A CODE',connecting:'CONNECTING...',
 noNetTitle:'ONLINE UNAVAILABLE',noNetMsg:'PeerJS failed to load or the network is blocked.',
 backTitle:'BACK TO MENU?',backOnline:'The online game will end for both players.',backLocal:'The current game will be lost.',yesLeave:'YES, LEAVE',
 setTitle:'SETTINGS',gAccTitle:'ACCOUNT',gConnect:'Connect Google Account',gConnecting:'Connecting…',gOk:'Account connected',gNone:'No account connected',gErrOffline:'No internet connection. Check your connection and try again.',gErrCancel:'Sign-in cancelled.',gErrNoAcc:'No Google account found on this device. Add one in Android settings and try again.',gErrUnavail:'Google sign-in is not available on this device. Update Google Play services and try again.',gErrFail:'Sign-in failed. Please try again.',gErrApp:'Google sign-in works only in the Android app.',support:'SUPPORT',supportBtn:'CONTACT',setAudio:'AUDIO',vib:'VIBRATION',fs:'FULLSCREEN',gfxOpt:'GRAPHICS ENGINE',fpsOpt:'FPS COUNTER',setDisplay:'DISPLAY',setGame:'GAME',whyTime:'THE OTHER PLAYER RAN OUT OF TIME 3 TIMES',confirmEnd:'CONFIRM END TURN',endAsk1:'You still have ',endAsk2:' AP left. End your turn anyway?',yesEnd:'YES, END TURN',again:'PLAY AGAIN',rmWait:'WAITING FOR OPPONENT...',rmAsk:'OPPONENT WANTS TO PLAY AGAIN!',aiName:'AI',aiLvTitle:'CHOOSE AI DIFFICULTY',lv_easy:'EASY',lv_medium:'NORMAL',lv_hard:'HARD',lvd_easy:'Great for learning. The AI makes many mistakes.',lvd_medium:'A fair fight. The AI sometimes slips.',lvd_hard:'No mercy. The AI plays its best.',m1:'METHOD 1',m1s:'Room code',m2:'METHOD 2',m2s:'Manual connect',
 mNote:'Method 2 needs no server or VPN. Works best when both phones share the same Wi-Fi or hotspot.',
 mH1:'Step 1: send this invite code to your opponent.',mH2:'Step 2: paste the reply code your opponent sends back, then tap CONNECT.',
 mJ1:'Step 1: paste the invite code from the host, then tap MAKE REPLY.',mJ2:'Step 2: send this reply code back to the host, then wait.',
 copyCode:'📋 COPY',paste:'📥 PASTE',makeReply:'MAKE REPLY',mMaking:'MAKING CODE... (few seconds)',mReady:'CODE READY',mJReady:'REPLY READY. SEND IT TO THE HOST AND WAIT...',mBad:'INVALID CODE',mCopied:'COPIED',mNoJs:'WebRTC is not available on this device.',
 sound:'SOUND EFFECTS',music:'MUSIC',grid:'GRID',fxOpt:'VISUAL EFFECTS',language:'LANGUAGE',langName:'فارسی',on:'ON',off:'OFF',menuTip:'Menu',
 how:`<div class="ht">
<h2>HOW TO PLAY</h2>
<div class="sub">Learn the basics in one minute.</div>

<h3>📱 FULLSCREEN</h3>
<div class="t">For a better view, <b>tap the screen once</b> and the game goes fullscreen, hiding your phone's top and bottom bars. If you swipe out of fullscreen, your next tap brings it back. To turn it off: <b>Settings → Game → Fullscreen</b>.</div>

<h3>🎯 GOAL</h3>
<div class="goal">You command a squad on a hex battlefield. There are two ways to win:
<ul>
<li><b>Destroy the enemy Core</b> (◆). It has 20 HP.</li>
<li><b>Hold all 3 purple Objective tiles</b> for 3 turns in a row.</li>
</ul></div>

<h3>🎲 STARTING THE GAME</h3>
<div class="t">Before the game starts, a quick draw decides who plays first. In online games, the host does the draw.</div>

<h3>👆 YOUR FIRST TURN, STEP BY STEP</h3>
<ol>
<li><b>Tap one of your units.</b> Its stats appear at the bottom.</li>
<li><b>Tap one of the buttons at the bottom:</b>
<ul>
<li><b style="color:var(--neon-cyan)">MOVE</b>: cyan tiles are where it can go. Tap one.</li>
<li><b style="color:var(--signal-red)">ATTACK</b>: enemies in range turn red. Tap one.</li>
<li><b style="color:var(--ion-violet)">ABILITY</b>: Support only. Heals a wounded teammate.</li>
</ul></li>
<li>When you're done, tap <b>END TURN</b>.</li>
</ol>

<h3>⚡ ACTION POINTS (AP)</h3>
<ul>
<li>Each turn you get <b>2 AP</b> (the two dots at the top of the screen).</li>
<li>Moving, attacking or healing costs <b>1 AP</b> each.</li>
<li>Every unit can <b>move once</b> and <b>attack or use its ability once</b> per turn. It can move first and then attack.</li>
<li>If you still have AP and tap END TURN, the game asks if you're sure. You can turn this off in Settings.</li>
</ul>

<h3>🪖 UNITS</h3>
<div class="u"><b style="color:var(--neon-cyan)">SOLDIER</b><span class="ustat">HP 10 · ATK 3 · RANGE 1</span>Balanced all-rounder.</div>
<div class="u"><b style="color:var(--neon-cyan)">ARCHER</b><span class="ustat">HP 6 · ATK 2 · RANGE 3</span>Strikes from a distance.</div>
<div class="u"><b style="color:var(--neon-cyan)">HEAVY</b><span class="ustat">HP 16 · ATK 4 · RANGE 1</span>Tough, but can only attack every other turn.</div>
<div class="u"><b style="color:var(--neon-cyan)">SUPPORT</b><span class="ustat">HP 8 · ATK 1 · RANGE 2</span>Heals a wounded teammate for 2 HP (not itself). Can heal again after 3 turns.</div>
<div class="u"><b style="color:var(--neon-cyan)">SNIPER</b><span class="ustat">HP 5 · ATK 5 · RANGE 4</span>High damage and range, but very fragile.</div>
<div class="u" style="border-inline-start-color:var(--signal-red)"><b style="color:var(--signal-red)">CORE ◆</b><span class="ustat">HP 20</span>Cannot move or attack. If it is destroyed, you lose.</div>
<div class="t">"Range" is how many tiles away a unit can strike. Every unit moves 1 tile per turn.</div>

<h3>🗺 SPECIAL TILES</h3>
<div class="t"><b style="color:var(--ion-violet)">◆ PURPLE · Objective</b><br>Hold all three with your units at the end of your turn, and keep them for <b>3 turns in a row</b>. The counter at the top (HOLD 1/3) shows your progress.</div>
<div class="t"><b style="color:var(--neon-cyan)">✚ CYAN · Repair</b><br>A unit standing here at the start of its turn heals 2 HP.</div>
<div class="t"><b style="color:#8b93a7">✕ GREY · Obstacle</b><br>Blocks movement, but attacks can fly over it.</div>

<h3>⏱ TURN TIMER (ONLINE ONLY)</h3>
<div class="t">Each turn lasts <b>20 seconds</b>. Every time the timer runs out, you lose a heart ♥. Hearts do not come back, and when you lose all 3, you lose the game.</div>

<h3>PLAYING VS AI🤖</h3>
<div class="t">There are three levels: <b>EASY</b> (great for learning, makes many mistakes), <b>NORMAL</b> (a fair fight) and <b>HARD</b> (plays its best).</div>

<h3>💡 TIPS</h3>
<div class="tip">Bring wounded units to the Repair tiles.</div>
<div class="tip">A red <b style="color:var(--signal-red)">-X</b> above a target shows how much damage you will deal.</div>
<div class="tip">Never leave your Core undefended.</div>
</div>`},
fa:{mapTitle:'انتخاب نقشه',mapBack:'بازگشت',mapObs:'مانع',mapRep:'خانهٔ ترمیم',tut:'آموزش تعاملی',tutAsk:'تازه‌واردی؟ آموزش تعاملی کوتاه رو امتحان کن (حدود ۲ دقیقه).',tutYes:'شروع آموزش',tutLater:'بعداً',tutNext:'بعدی',tutSkip:'رد کردن',tutFin:'پایان',tutStepOf:'مرحله',tp0:'خوش اومدی فرمانده! هدف: نابود کردن هستهٔ دشمن، یا نگه داشتن هر ۳ خانهٔ بنفش در ۳ نوبت پشت‌سرهم.',tp1:'روی سرباز خودت (حلقهٔ زرد) بزن تا انتخاب بشه.',tp2:'هر واحد در هر نوبت یک خانه حرکت می‌کنه. روی خانهٔ مشخص‌شده بزن تا کنار دشمن بری.',tp3:'حالا دکمهٔ «حمله» رو بزن.',tp4:'روی سرباز قرمز بزن تا بهش حمله کنی. حرکت و حمله هرکدوم یک امتیاز عمل مصرف می‌کنن (در هر نوبت ۲ تا داری).',tp5:'امتیاز عملت تموم شد. «پایان نوبت» رو بزن.',tpW:'نوبت دشمن…',tp6:'پشتیبان تو می‌تونه به هم‌تیمی‌ها جان برگردونه. روی پشتیبان بزن.',tp7:'حالا دکمهٔ «توانایی» رو بزن.',tp8:'روی سربازِ زخمی بزن تا ترمیم بشه.',tp9:'خانه‌های بنفش رو بگیر و ۳ نوبت پشت‌سرهم نگه دار تا ببری. موانع جلوی حرکت رو می‌گیرن و خانه‌های ترمیم اول نوبت جان برمی‌گردونن.',tp10:'آماده‌ای! موفق باشی فرمانده.',map:'نقشه',map_classic:'کلاسیک',map_reactor:'راکتور',local:'بازی 2 نفره',host:'ساخت اتاق',join:'ورود به اتاق',vsai:'بازی با AI🤖',howBtn:'آموزش بازی',settings:'تنظیمات',
 move:'حرکت',attack:'حمله',ability:'توانایی',endTurn:'پایان نوبت',close:'بستن',aiThink:'AI در حال فکر کردن...',
 player:'بازیکن',ai:'(AI)',you:'(شما)',hold:'نگه‌داری',hp:'سلامتی',atk:'حمله',range:'برد',mv:'حرکت',cd:'انتظار',selectUnit:'یک واحد انتخاب کنید',
 u_soldier:'سرباز',u_archer:'کماندار',u_heavy:'سنگین',u_support:'پشتیبان',u_sniper:'تک‌تیرانداز',u_core:'پایگاه',
 wins:'برنده شد',firstTitle:'چه کسی اول شروع می‌کند؟',firstGoes:'اول شروع می‌کند',whyCore:'پایگاه نابود شد',whyObj:'هر سه هدف به‌مدت ۳ نوبت نگه داشته شد',
 connLost:'اتصال قطع شد',oppLeft:'حریف از بازی خارج شد',
 hostTitle:'🌐 ساخت اتاق بازی',hostShare:'این کد را برای حریفتان بفرستید (واتساپ / تلگرام):',hostGen:'در حال ساخت کد...',hostWait:'منتظر ورود حریف...',
 copy:'📋 کپی',cancel:'انصراف',err:'خطا: ',
 joinTitle:'🌐 ورود به اتاق بازی',joinPaste:'کد اتاقی را که حریفتان فرستاده وارد کنید:',connect:'اتصال',enterCode:'یک کد وارد کنید',connecting:'در حال اتصال...',
 noNetTitle:'بازی آنلاین در دسترس نیست',noNetMsg:'PeerJS لود نشد یا شبکه مسدود است.',
 backTitle:'بازگشت به منو؟',backOnline:'بازی آنلاین برای هر دو بازیکن تمام می‌شود.',backLocal:'بازی فعلی از دست می‌رود.',yesLeave:'بله، خروج',
 setTitle:'تنظیمات',gAccTitle:'حساب کاربری',gConnect:'اتصال حساب گوگل',gConnecting:'در حال اتصال…',gOk:'حساب متصل است',gNone:'حسابی متصل نیست',gErrOffline:'اینترنت وصل نیست. اتصال را بررسی کنید و دوباره تلاش کنید.',gErrCancel:'ورود لغو شد.',gErrNoAcc:'حساب گوگلی روی این دستگاه پیدا نشد. از تنظیمات اندروید یک حساب اضافه کنید و دوباره تلاش کنید.',gErrUnavail:'ورود با گوگل روی این دستگاه در دسترس نیست. Google Play Services را به‌روزرسانی کنید.',gErrFail:'ورود انجام نشد. لطفاً دوباره تلاش کنید.',gErrApp:'ورود با گوگل فقط در برنامهٔ اندروید کار می‌کند.',support:'پشتیبانی',supportBtn:'ارتباط',setAudio:'صدا',vib:'لرزش',fs:'تمام‌صفحه',gfxOpt:'موتور گرافیکی',fpsOpt:'نمایش FPS',setDisplay:'نمایش',setGame:'بازی',whyTime:'حریف ۳ بار زمان نوبتش را از دست داد',confirmEnd:'تأیید پایان نوبت',endAsk1:'هنوز ',endAsk2:' امتیاز عمل (AP) باقی مانده است. نوبت را تمام می‌کنید؟',yesEnd:'بله، پایان نوبت',again:'بازی دوباره',rmWait:'منتظر تأیید حریف...',rmAsk:'حریف می‌خواهد دوباره بازی کند!',aiName:'AI',aiLvTitle:'سطح AI را انتخاب کنید',lv_easy:'آسان',lv_medium:'متوسط',lv_hard:'سخت',lvd_easy:'مناسب یادگیری. AI زیاد اشتباه می‌کند.',lvd_medium:'مبارزه‌ای منصفانه. گاهی اشتباه می‌کند.',lvd_hard:'بدون ترحم. بهترین بازی خودش را می‌کند.',m1:'روش 1',m1s:'کد اتاق',m2:'روش 2',m2s:'اتصال دستی',
 mNote:'روش 2 به سرور و VPN نیاز ندارد. وقتی هر دو گوشی روی یک Wi-Fi یا هات‌اسپات باشند بهترین کار را می‌کند.',
 mH1:'مرحله 1: این کد دعوت را برای حریفتان بفرستید.',mH2:'مرحله 2: کد جوابی را که حریف فرستاد اینجا بچسبانید و «اتصال» را بزنید.',
 mJ1:'مرحله 1: کد دعوت میزبان را بچسبانید و «ساخت کد جواب» را بزنید.',mJ2:'مرحله 2: این کد جواب را برای میزبان بفرستید و منتظر بمانید.',
 copyCode:'📋 کپی',paste:'📥 چسباندن',makeReply:'ساخت کد جواب',mMaking:'در حال ساخت کد... (چند ثانیه)',mReady:'کد آماده است',mJReady:'کد جواب آماده است. آن را برای میزبان بفرستید و منتظر بمانید...',mBad:'کد نامعتبر است',mCopied:'کپی شد',mNoJs:'این گوشی از WebRTC پشتیبانی نمی‌کند.',
 sound:'افکت‌های صدا',music:'موسیقی',grid:'شبکه',fxOpt:'افکت‌های بصری',language:'زبان',langName:'English',on:'روشن',off:'خاموش',menuTip:'منو',
 how:`<div class="ht">
<h2>آموزش بازی</h2>
<div class="sub">اصول بازی را در یک دقیقه یاد بگیرید.</div>

<h3>📱 تمام‌صفحه</h3>
<div class="t">برای بازی راحت‌تر، <b>یک بار روی صفحه بزنید</b> تا بازی تمام‌صفحه شود و نوارهای بالا و پایین گوشی پنهان شوند. اگر با کشیدن از لبه از تمام‌صفحه خارج شدید، لمس بعدی دوباره واردش می‌کند. برای خاموش‌کردنش: <b>تنظیمات ← بازی ← تمام‌صفحه</b>.</div>

<h3>🎯 هدف</h3>
<div class="goal">شما فرمانده یک تیم روی نقشه‌ی شش‌ضلعی هستید. دو راه برای بردن دارید:
<ul>
<li><b>پایگاه (◆) حریف را نابود کنید.</b> پایگاه ۲۰ سلامتی دارد.</li>
<li><b>هر ۳ خانه‌ی بنفش را</b> ۳ نوبت پشت‌سرهم نگه دارید.</li>
</ul></div>

<h3>🎲 شروع بازی</h3>
<div class="t">قبل از شروع، یک قرعه‌ی کوتاه معلوم می‌کند چه کسی اول بازی می‌کند. در بازی آنلاین، میزبان قرعه را می‌اندازد.</div>

<h3>👆 اولین نوبت شما، قدم‌به‌قدم</h3>
<ol>
<li><b>روی یکی از واحدهای خودتان بزنید.</b> مشخصاتش پایین صفحه می‌آید.</li>
<li><b>یکی از دکمه‌های پایین را بزنید:</b>
<ul>
<li><b style="color:var(--neon-cyan)">حرکت</b>: خانه‌های فیروزه‌ای جاهای قابل‌رفتن‌اند. روی یکی بزنید.</li>
<li><b style="color:var(--signal-red)">حمله</b>: دشمن‌های داخل برد قرمز می‌شوند. روی یکی بزنید.</li>
<li><b style="color:var(--ion-violet)">توانایی</b>: فقط پشتیبان. هم‌تیمی زخمی را ترمیم می‌کند.</li>
</ul></li>
<li>وقتی کارتان تمام شد، <b>پایان نوبت</b> را بزنید.</li>
</ol>

<h3>⚡ امتیاز عمل (AP)</h3>
<ul>
<li>هر نوبت <b>۲ AP</b> دارید (دو نقطه‌ی بالای صفحه).</li>
<li>حرکت، حمله یا ترمیم هرکدام <b>۱ AP</b> می‌خورد.</li>
<li>هر واحد در هر نوبت <b>یک بار حرکت</b> و <b>یک بار حمله یا توانایی</b> دارد. می‌تواند اول حرکت کند و بعد حمله کند.</li>
<li>اگر AP باقی مانده باشد و پایان نوبت بزنید، بازی می‌پرسد مطمئن هستید. این پرسش از تنظیمات خاموش می‌شود.</li>
</ul>

<h3>🪖 واحدها</h3>
<div class="u"><b style="color:var(--neon-cyan)">سرباز</b><span class="ustat">سلامتی ۱۰ · حمله ۳ · برد ۱</span>متعادل و همه‌فن‌حریف.</div>
<div class="u"><b style="color:var(--neon-cyan)">کماندار</b><span class="ustat">سلامتی ۶ · حمله ۲ · برد ۳</span>از دور می‌زند.</div>
<div class="u"><b style="color:var(--neon-cyan)">سنگین</b><span class="ustat">سلامتی ۱۶ · حمله ۴ · برد ۱</span>محکم است، ولی یک نوبت در میان می‌تواند حمله کند.</div>
<div class="u"><b style="color:var(--neon-cyan)">پشتیبان</b><span class="ustat">سلامتی ۸ · حمله ۱ · برد ۲</span>یک هم‌تیمی زخمی را ۲ سلامتی ترمیم می‌کند (نه خودش را). ۳ نوبت بعد دوباره می‌تواند.</div>
<div class="u"><b style="color:var(--neon-cyan)">تک‌تیرانداز</b><span class="ustat">سلامتی ۵ · حمله ۵ · برد ۴</span>آسیب و برد بالا، ولی خیلی شکننده است.</div>
<div class="u" style="border-inline-start-color:var(--signal-red)"><b style="color:var(--signal-red)">پایگاه ◆</b><span class="ustat">سلامتی ۲۰</span>حرکت و حمله ندارد. اگر نابود شود، می‌بازید.</div>
<div class="t">«برد» یعنی چند خانه آن‌طرف‌تر می‌تواند بزند. همه‌ی واحدها هر نوبت ۱ خانه حرکت می‌کنند.</div>

<h3>🗺 خانه‌های ویژه</h3>
<div class="t"><b style="color:var(--ion-violet)">◆ بنفش · هدف</b><br>در پایان نوبتتان هر سه را با واحدهای خودتان داشته باشید و <b>۳ نوبت پشت‌سرهم</b> نگه دارید. شمارنده‌ی بالا (نگه‌داری ۱/۳) پیشرفت را نشان می‌دهد.</div>
<div class="t"><b style="color:var(--neon-cyan)">✚ فیروزه‌ای · ترمیم</b><br>واحدی که ابتدای نوبتش روی آن باشد ۲ سلامتی می‌گیرد.</div>
<div class="t"><b style="color:#8b93a7">✕ خاکستری · مانع</b><br>جلوی حرکت را می‌گیرد، ولی حمله از رویش رد می‌شود.</div>

<h3>⏱ زمان نوبت (فقط آنلاین)</h3>
<div class="t">هر نوبت <b>۲۰ ثانیه</b> است. هر بار زمان تمام شود، یک قلب ♥ از شما کم می‌شود. قلب‌ها برنمی‌گردند و با از دست‌دادن هر ۳ قلب، بازی را می‌بازید.</div>

<h3>بازی با AI🤖</h3>
<div class="t">سه سطح دارد: <b>آسان</b> (برای یادگیری، زیاد اشتباه می‌کند)، <b>متوسط</b> (مبارزه‌ی منصفانه) و <b>سخت</b> (بهترین بازی خودش را می‌کند).</div>

<h3>💡 نکته‌ها</h3>
<div class="tip">واحدهای زخمی را به خانه‌ی ترمیم ببرید.</div>
<div class="tip">عدد قرمز <b style="color:var(--signal-red)">-X</b> بالای هدف نشان می‌دهد چه آسیبی می‌زنید.</div>
<div class="tip">پایگاهتان را بی‌دفاع نگذارید.</div>
</div>`}};
const tr=k=>{const d=LANGS[S.lang]||LANGS.en;return d[k]!==undefined?d[k]:(LANGS.en[k]!==undefined?LANGS.en[k]:k)};
function applyLang(){
  const fa=S.lang==='fa';
  document.documentElement.lang=fa?'fa':'en';
  document.body.classList.toggle('fa',fa);
  ['#modal','#netModal'].forEach(q=>{const e=$(q);if(e)e.dir=fa?'rtl':'ltr'});
  document.querySelectorAll('[data-i18n]').forEach(e=>{e.textContent=tr(e.dataset.i18n);e.dir=fa?'rtl':'ltr';e.style.unicodeBidi='isolate'});
  const mb=$('#bMenu');if(mb)mb.title=tr('menuTip');
  mapLabel();
}

let AC=null;
const audio=()=>{if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)();
 AC.onstatechange=()=>{if(AC.state==='running'&&S.music&&!music&&!over&&document.querySelector('#game.on'))startMusic()}}catch(e){}}
 if(AC&&AC.state!=='running')try{AC.resume()}catch(e){}return AC};
/* باز کردن قفل صدا: مرورگر فقط با click/touchend/pointerup/keydown اجازه‌ی پخش می‌دهد (نه pointerdown) */
const _unlockEv=['pointerup','touchend','click','keydown'];
const unlockAudio=()=>{const a=audio();if(a&&a.state==='running')_unlockEv.forEach(ev=>removeEventListener(ev,unlockAudio,true))};
_unlockEv.forEach(ev=>addEventListener(ev,unlockAudio,true));
function tone(f,d,type,v,t0,f2){const a=audio();if(!a||!S.sound)return;const o=a.createOscillator(),g=a.createGain(),t=a.currentTime+(t0||0);
 o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(Math.max(20,f2),t+d);
 g.gain.setValueAtTime(v||.15,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d+.02)}
function noise(d,v,hp){const a=audio();if(!a||!S.sound)return;const n=a.sampleRate*d|0,b=a.createBuffer(1,n,a.sampleRate),c=b.getChannelData(0);
 for(let i=0;i<n;i++)c[i]=(Math.random()*2-1)*Math.pow(1-i/n,1.4);const s=a.createBufferSource(),g=a.createGain();
 g.gain.setValueAtTime(v||.2,a.currentTime);g.gain.exponentialRampToValueAtTime(.001,a.currentTime+d);
 if(hp){const f=a.createBiquadFilter();f.type='highpass';f.frequency.value=hp;s.connect(f);f.connect(g)}else s.connect(g);
 g.connect(a.destination);s.buffer=b;s.start()}
/* افکت‌های صوتی ارتقایافته – نئون / سایبر / تاکتیکال */
const SFX={
  move:()=>{tone(720,.045,'square',.09);tone(1100,.03,'square',.05,.02)},
  atk:()=>{noise(.14,.32,400);tone(180,.12,'sawtooth',.22);tone(90,.18,'sine',.15)},
  snipe:()=>{tone(2200,.05,'sawtooth',.12);tone(1800,.09,'sawtooth',.08,.03,400);noise(.1,.22,1200);setTimeout(()=>noise(.08,.18,600),90)},
  heal:()=>{tone(520,.4,'sine',.16,0,980);tone(780,.25,'triangle',.1,.08,1200);noise(.06,.08,3000)},
  die:()=>{noise(.22,.35,200);tone(160,.2,'sawtooth',.2,0,40);tone(80,.28,'sine',.18)},
  select:()=>{tone(640,.04,'triangle',.08);tone(960,.03,'sine',.05,.025)},
  click:()=>{tone(880,.035,'square',.07)},
  end:()=>{tone(440,.08,'triangle',.12);tone(660,.1,'triangle',.1,.07)},
  tick:()=>{tone(980,.06,'square',.09)},
  warn:()=>{tone(720,.07,'square',.11);tone(540,.09,'square',.09,.06)},
  win:()=>{[523,659,784,1047,1319].forEach((f,i)=>tone(f,.28,'triangle',.17,i*.11));
           setTimeout(()=>{tone(1047,.4,'sine',.12);tone(1319,.5,'triangle',.1,.05)},550)},
  error:()=>{tone(220,.15,'sawtooth',.14);tone(180,.18,'square',.1,.05)}
};
/* آنلاین: مهمان فقط وضعیت را دریافت می‌کند، پس میزبان رویداد صدا را هم برایش می‌فرستد */
SFX._o={};Object.keys(SFX).forEach(k=>{if(k==='_o')return;const f=SFX[k];SFX._o[k]=f;
 if(k!=='win')SFX[k]=()=>{f();try{if(onlineMode==='host'){NET.send({t:'sfx',n:k});window._tx=(window._tx||0)+1}}catch(e){}}});
function syncSet(){const a=$('#tSound'),b=$('#tGrid');{const fb=$('#tFx');if(fb)fb.textContent=S.fx!==false?tr('on'):tr('off')}if(a)a.textContent=S.sound?tr('on'):tr('off');if(b)b.textContent=S.grid?tr('on'):tr('off');const lg=$('#tLang');if(lg)lg.textContent=tr('langName');const mu=$('#tMusic');if(mu)mu.textContent=S.music?tr('on'):tr('off');const cf=$('#tConfirm');if(cf)cf.textContent=S.confirmEnd!==false?tr('on'):tr('off');const vb=$('#tVib');if(vb)vb.textContent=S.vib!==false?tr('on'):tr('off');const fb=$('#tFs');if(fb)fb.textContent=S.fs!==false?tr('on'):tr('off');const fp=$('#tFps');if(fp)fp.textContent=S.fps!==false?tr('on'):tr('off');const gv=$('#gV');if(gv)gv.textContent=S.gfx==='canvas'?'Canvas':'PixiJS';
 document.querySelectorAll('.mute').forEach(m=>{m.innerHTML='<img src="'+((S.sound||S.music)?SND_ON:SND_OFF)+'" alt="">'});
 [['tSound',S.sound],['tMusic',S.music],['tGrid',S.grid],['tFx',S.fx!==false],['tConfirm',S.confirmEnd!==false],['tVib',S.vib!==false],['tFs',S.fs!==false],['tFps',S.fps!==false]].forEach(([id,v])=>{const e=$('#'+id);if(e)e.classList.toggle('on',!!v)});
 try{localStorage.setItem('nc',JSON.stringify(S))}catch(e){}}
/* ---------- موسیقی پس‌زمینه: سینت‌ویو تولیدشده با WebAudio (بدون فایل صوتی؛ نت‌ها بالاتر از ۱۱۰ هرتز تا روی بلندگوی گوشی شنیده شوند) ---------- */
let music=null;
const MIDI=n=>440*Math.pow(2,(n-69)/12);
const PROG=[{r:45,t:[57,60,64],a:[69,72,76,72]},{r:41,t:[53,57,60],a:[65,69,72,69]},{r:48,t:[55,60,64],a:[72,76,79,76]},{r:43,t:[55,59,62],a:[71,74,79,74]}];
const ARP=[0,1,2,1,0,1,2,3],BPM=104,SPB=60/BPM/2;
function startMusic(){
  if(!S.music||music)return;const a=audio();if(!a)return;
  const bus=a.createGain(),lp=a.createBiquadFilter();
  lp.type='lowpass';lp.frequency.value=2400;bus.gain.value=0;
  bus.gain.linearRampToValueAtTime(1,a.currentTime+1.5);bus.connect(lp);lp.connect(a.destination);
  const voice=(type,f,t,dur,vol,att)=>{const o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.value=f;
    g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(vol,t+(att||.01));g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    o.connect(g);g.connect(bus);o.start(t);o.stop(t+dur+.05)};
  const hat=(t)=>{const n=a.sampleRate*.04|0,b=a.createBuffer(1,n,a.sampleRate),c=b.getChannelData(0);
    for(let i=0;i<n;i++)c[i]=(Math.random()*2-1)*(1-i/n);const src=a.createBufferSource(),hp=a.createBiquadFilter(),g=a.createGain();
    hp.type='highpass';hp.frequency.value=6000;g.gain.value=.05;src.buffer=b;src.connect(hp);hp.connect(g);g.connect(bus);src.start(t)};
  const kick=(t)=>{const o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(190,t);o.frequency.exponentialRampToValueAtTime(60,t+.12);
    g.gain.setValueAtTime(.35,t);g.gain.exponentialRampToValueAtTime(.001,t+.14);o.connect(g);g.connect(bus);o.start(t);o.stop(t+.16)};
  let step=0,nextT=a.currentTime+.12;
  const play=(st,t)=>{const ch=PROG[(st>>3)&3],k=st&7;
    voice('sawtooth',MIDI(ch.r),t,SPB*.9,.09,.005);                  /* باس */
    voice('square',MIDI(ch.r+12),t,SPB*.6,.025,.005);                 /* هارمونیک باس برای شنیده‌شدن روی بلندگو */
    voice('triangle',MIDI(ch.a[ARP[k]]),t,SPB*1.4,.09,.01);          /* آرپژ */
    if(k===0)ch.t.forEach(n=>voice('triangle',MIDI(n),t,SPB*8,.035,.4)); /* پد */
    if(k===0||k===4)kick(t);if(k===2||k===6)hat(t)};
  const timer=setInterval(()=>{
    if(a.state!=='running'){nextT=a.currentTime+.12;return}
    while(nextT<a.currentTime+.4){play(step,nextT);nextT+=SPB;step++}},100);
  music={bus,timer};
}
function stopMusic(){if(!music)return;const m=music;music=null;clearInterval(m.timer);
  try{const a=AC;m.bus.gain.cancelScheduledValues(a.currentTime);m.bus.gain.setValueAtTime(m.bus.gain.value,a.currentTime);m.bus.gain.linearRampToValueAtTime(0,a.currentTime+.3)}catch(e){}
  setTimeout(()=>{try{m.bus.disconnect()}catch(e){}},500)}
const startAmbient=startMusic,stopAmbient=stopMusic;
const setSound=v=>{S.sound=v;S.music=v;syncSet();if(!v)stopMusic();else if($('#game').classList.contains('on')&&!over)startMusic()};
/* ---------- آمار واحدها ---------- */
const STATS={soldier:{hp:10,atk:3,range:1,move:1},archer:{hp:6,atk:2,range:3,move:1},
 heavy:{hp:16,atk:4,range:1,move:1},support:{hp:8,atk:1,range:2,move:1},sniper:{hp:5,atk:5,range:4,move:1},core:{hp:20,atk:0,range:0,move:0}};
const GLYPH={soldier:'S',archer:'A',heavy:'H',support:'+',sniper:'X',core:'◆'};
/* ---------- مختصات axial ---------- */
const N=8, DIRS=[[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]];
const o2a=(c,r)=>({q:c-((r-(r&1))>>1),r});
const key=(q,r)=>q+','+r;
const cells=[];for(let r=0;r<N;r++)for(let c=0;c<N;c++)cells.push(o2a(c,r));
const cellSet=new Set(cells.map(h=>key(h.q,h.r)));
/* ---------- نقشه‌ها (v1.8.7) ----------
   مختصات به‌صورت [ستون، ردیف] روی صفحهٔ ۸×۸ است. هر نقشه دقیقاً ۳ خانهٔ هدف دارد.
   bg: تصویر پس‌زمینهٔ نقشه (آدرس یا data:URI)؛ اگر خالی باشد از bgCss استفاده می‌شود. */
const MAPS={
 classic:{obj:[[3,3],[4,3],[3,4]],obs:[[3,2],[4,5],[2,3],[5,4]],rep:[[0,4],[7,3]],bg:'',bgCss:''},
 reactor:{obj:[[4,3],[3,4],[4,4]],obs:[[3,5],[4,2],[2,3],[5,4],[2,1],[5,6]],rep:[[0,2],[7,5]],bg:'',
  bgCss:''}
};
const MAP_IDS=Object.keys(MAPS),MAP_DIM=.5;   /* MAP_DIM: تیرگی روی تصویر برای خوانایی خانه‌ها */
const OBJ=[],OBSTACLES=new Set(),REPAIR=new Set();let curMap='classic';
function setMap(id){
 if(!MAPS[id])id='classic';curMap=id;const m=MAPS[id],k=([c,r])=>{const h=o2a(c,r);return key(h.q,h.r)};
 OBJ.length=0;m.obj.forEach(x=>OBJ.push(k(x)));
 OBSTACLES.clear();m.obs.forEach(x=>OBSTACLES.add(k(x)));
 REPAIR.clear();m.rep.forEach(x=>REPAIR.add(k(x)));
 const w=document.getElementById('wrap');
 if(w){if(m.bg)w.style.background='linear-gradient(rgba(11,15,26,'+MAP_DIM+'),rgba(11,15,26,'+MAP_DIM+')),url('+m.bg+') center/cover no-repeat';
  else w.style.background=m.bgCss||''}
}
setMap('classic');
const neighbors=(q,r)=>DIRS.map(d=>({q:q+d[0],r:r+d[1]})).filter(h=>cellSet.has(key(h.q,h.r)));
/* ---------- وضعیت بازی (hoisted برای رفع TDZ) ---------- */
let units,turn,ap,sel,mode,moveSet,atkSet,healSet,holdStreak,over=false,hover=null,aiMode=false,fx=[],shake=0,shakeT=0,objPrev={},holdPrev={1:0,2:0},lastTurnSeen=0,_pm=null,_pa=null,_ph=null,_ps=null,hlT=0,tileScale=1;
const TURN_SEC=20,MAX_TIMEOUTS=3;let turnEnd=performance.now()+TURN_SEC*1000,_lastBeep=-1,timeouts={1:0,2:0},_auto=false;
let aiGen=0,aiFocus=null,aiLast={},aiActs={},aiRank=null,aiTurnNo=0;
function mk(id,owner,type,c,r){const s=STATS[type],a=o2a(c,r);
 return{id,owner,type,hp:s.hp,maxHp:s.hp,atk:s.atk,range:s.range,move:s.move,hasMoved:false,hasAttacked:false,cooldown:0,q:a.q,r:a.r}}
function newGame(isAI=false,first,mapId){setMap(mapId||S.map||'classic');objPrev={};
 if(PX){try{PX.unitC.removeChildren().forEach(o=>{try{o.destroy({children:true})}catch(e){}})}catch(e){}PX.units=new Map()}   /* بازی تازه: اسپرایت‌های بازی قبل را پاک کن */holdPrev={1:0,2:0};lastTurnSeen=0;aiMode=isAI;timeouts={1:0,2:0};turnEnd=performance.now()+TURN_SEC*1000;rmMine=false;rmTheirs=false;
 units=[mk(1,1,'core',0,7),mk(2,1,'soldier',1,7),mk(3,1,'archer',0,6),mk(4,1,'heavy',1,6),mk(5,1,'support',2,7),mk(11,1,'sniper',1,5),
        mk(6,2,'core',7,0),mk(7,2,'soldier',6,0),mk(8,2,'archer',7,1),mk(9,2,'heavy',6,1),mk(10,2,'support',5,0),mk(12,2,'sniper',6,2)];
 if(typeof TUT!=='undefined'&&TUT.on){units=tutUnits();first=1}   /* آموزش: صحنهٔ ساده و ثابت */
 turn=(first===1||first===2)?first:(Math.random()<.5?1:2);lastTurnSeen=turn;ap=2;sel=null;mode='move';moveSet=new Set();atkSet=new Set();healSet=new Set();holdStreak={1:0,2:0};over=false;fx=[];
 aiGen++;aiFocus=null;aiLast={};aiRank=null;aiTurnNo=0;$('#ai-think').style.display='none';stopAmbient();startAmbient();refresh();
 /* قرعهٔ نوبت اول: انیمیشن، سپس تایمر و (در صورت نوبت AI) شروع AI */
 const introMs=(typeof TUT!=='undefined'&&TUT.on)?(introActive=false,0):playIntro(turn);_qHold=performance.now()+introMs+3000;turnEnd=performance.now()+introMs+TURN_SEC*1000;
 if(isAI&&turn===2){const g=aiGen;setTimeout(()=>{if(g===aiGen)AITurn()},introMs+400)}}
/* ---------- قرعهٔ نوبت اول (انیمیشن) ---------- */
let _introT=[],introActive=false,firstIntroDone=false;
const FIRST_INTRO_LEAD_MS=300;   /* فقط اولین قرعه بعد از باز شدن برنامه: چند لحظه دیرتر شروع شود تا نقشه کامل باز شود */   /* تا پایان قرعه، نوار بالا و کنترل‌ها نباید نشان دهند چه کسی شروع می‌کند */
function playIntro(first){
 _introT.forEach(clearTimeout);_introT=[];
 const ov=$('#firstOv');if(!ov)return 0;
 introActive=true;refresh();
 const w=[$('#foP1'),$('#foP2')],nm=p=>(aiMode&&p===2)?tr('aiName'):tr('player')+' '+p;
 const sub=p=>(onlineMode&&((onlineMode==='host')===(p===1)))?tr('you'):'';
 [1,2].forEach(p=>{w[p-1].querySelector('.fo-c').innerHTML='<div>'+nm(p)+(sub(p)?'<br><small>'+sub(p)+'</small>':'')+'</div>';w[p-1].classList.remove('hi','win')});
 $('#foT').textContent=tr('firstTitle');$('#foT').classList.remove('res');$('#foT').dir=(S.lang==='fa')?'rtl':'ltr';   /* جهت متن با زبان: AI و فارسی درست کنار هم بنشینند */$('#foR').textContent='';
 const lead=firstIntroDone?0:FIRST_INTRO_LEAD_MS;firstIntroDone=true;
 ov.classList.remove('out');
 if(lead)_introT.push(setTimeout(()=>ov.classList.add('on'),lead));else ov.classList.add('on');
 const fast=RM||S.fx===false,delays=fast?[]:[70,70,70,80,95,115,140,175,225,290,380],n=delays.length;
 const off=(((first-1)-(n-1))%2+2)%2;   /* آخرین قدم دقیقاً روی برنده می‌نشیند */
 let t=lead;
 delays.forEach((d,s)=>{const side=(s+off)%2;
  _introT.push(setTimeout(()=>{w[0].classList.toggle('hi',side===0);w[1].classList.toggle('hi',side===1);try{tone(520+s*35,.04,'square',.05)}catch(e){}},t));t+=d});
 const land=t+(fast?0:120);
 _introT.push(setTimeout(()=>{w[0].classList.toggle('hi',first===1);w[1].classList.toggle('hi',first===2);w[first-1].classList.add('win');
  introActive=false;refresh();   /* قرعه تمام شد: حالا نوار بالا واقعی می‌شود */
  $('#foT').textContent=nm(first)+' · '+tr('firstGoes');$('#foT').classList.add('res');try{tone(784,.12,'triangle',.15);tone(1047,.22,'triangle',.15,.1)}catch(e){}},land));
 _introT.push(setTimeout(()=>ov.classList.add('out'),land+800));
 _introT.push(setTimeout(()=>ov.classList.remove('on'),land+1100));
 return land+1100}
const unitAt=(q,r)=>units.find(u=>u.q===q&&u.r===r&&u.hp>0);
/* BFS — فاز ۵: موانع مسدودکننده هستند */
function getMoves(u){
 const out=new Set(),seen=new Set([key(u.q,u.r)]);let fr=[{q:u.q,r:u.r}];
 for(let d=0;d<u.move;d++){const nx=[];
  for(const h of fr)for(const n of neighbors(h.q,h.r)){const k=key(n.q,n.r);
   if(seen.has(k)||unitAt(n.q,n.r)||OBSTACLES.has(k))continue;
   seen.add(k);out.add(k);nx.push(n)}
  fr=nx}
 return out;
}
const dist=(a,b)=>{const dq=a.q-b.q,dr=a.r-b.r;return(Math.abs(dq)+Math.abs(dr)+Math.abs(dq+dr))/2};
const canAttack=u=>u.atk>0&&!u.hasAttacked&&!(u.type==='heavy'&&u.cooldown>0);
const canHeal=u=>u.type==='support'&&!u.hasAttacked&&u.cooldown===0;
function select(u){sel=u;moveSet=new Set();atkSet=new Set();healSet=new Set();
 if(!u||u.hp<=0||u.owner!==turn||ap<1||over)return;
 if(mode==='move'&&!u.hasMoved&&u.move>0)moveSet=getMoves(u);
 if(mode==='attack'&&canAttack(u))units.forEach(t=>{if(t.hp>0&&t.owner!==u.owner&&dist(u,t)<=u.range)atkSet.add(key(t.q,t.r))});
 if(mode==='ability'&&canHeal(u))units.forEach(t=>{if(t.hp>0&&t!==u&&t.owner===u.owner&&t.hp<t.maxHp&&dist(u,t)<=u.range)healSet.add(key(t.q,t.r))});
 if(u&&u.owner===turn)SFX.select()}
function attack(u,t){
 const a=hexToPixel(u.q,u.r),b=hexToPixel(t.q,t.r);
 const dmg=Math.min(u.atk,t.hp);
 {const dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy)||1,nw=performance.now(),pd=u.type==='sniper'?300:180;
  u.lunge={t0:nw,ux:dx/L,uy:dy/L,amp:u.range>1?.12:.34};t.kb={t0:nw+pd,ux:dx/L,uy:dy/L}}
 fx.push({k:'proj',x1:a.x,y1:a.y,x2:b.x,y2:b.y,t0:performance.now(),col:u.owner===1?C.cyan:C.red,dur:u.type==='sniper'?300:180});
 fx.push({k:'dmg',x:b.x,y:b.y,txt:'-'+dmg,t0:performance.now(),col:C.red,dur:750});
 t.hp=Math.max(0,t.hp-u.atk);t.hitT=performance.now();if(t.hp===0)t.dieT=t.hitT;
 {const pd=u.type==='sniper'?300:180,ac=u.owner===1?C.cyan:C.red;fxMuzzle(a.x,a.y,ac);fxImpact(b.x,b.y,ac,t.hp===0,t.type==='core',u.type==='sniper'||u.type==='heavy',pd)}
 if(u.type==='sniper')SFX.snipe();else SFX.atk();
 if(t.hp===0)SFX.die();
 
 vib(t.hp===0?[40,30,90]:30);
 u.hasAttacked=true;ap--;if(u.type==='heavy')u.cooldown=2;
 if(t.hp===0&&t.type==='core'){over=true;gameOver(u.owner,'core')}
 broadcastState();}
function heal(u,t){
 const h=Math.min(2,t.maxHp-t.hp);t.hp=Math.min(t.maxHp,t.hp+2);
 const p=hexToPixel(t.q,t.r);fx.push({k:'dmg',x:p.x,y:p.y,txt:'+'+h,t0:performance.now(),col:C.cyan,dur:750});
 SFX.heal();vib(15);{const a=hexToPixel(u.q,u.r);fx.push({k:'beam',x1:a.x,y1:a.y,x2:p.x,y2:p.y,t0:performance.now(),col:C.violet,dur:460});
  for(let i=0;i<7;i++){const q=Math.random();fx.push({k:'spark',x:a.x+(p.x-a.x)*q,y:a.y+(p.y-a.y)*q,vx:(Math.random()-.5)*size*.6,vy:(Math.random()-.5)*size*.6-size*.4,fr:2,t0:performance.now()+i*34,dur:520,col:i%2?'#ffffff':C.violet,r:size*.06})}
  fxRing(a.x,a.y,C.violet,size*.9,420,2,0);fxHeal(p.x,p.y,240)}
 u.hasAttacked=true;u.cooldown=3;ap--;broadcastState()}
function gameOver(w,why){SFX.win();vib([80,40,80,40,160]);try{fxVictory(w,why)}catch(e){}stopAmbient();if(onlineMode==='host')setTimeout(()=>NET.send({t:'over',w,why}),60);modal('<b style="font-size:24px;color:'+(w===1?C.cyan:C.red)+'">'+tr('player')+' '+w+' '+tr('wins')+'</b><br>'+tr(why==='obj'?'whyObj':why==='time'?'whyTime':'whyCore')+'<br><br><button class="btn" id="bAgain" style="width:100%;border-color:var(--amber-core);color:var(--amber-core)">'+tr('again')+'</button><div id="rmStatus" style="text-align:center;font-size:12px;color:#8b93a7;margin-top:8px;min-height:18px"></div>');
 $('#bAgain').onclick=rematchTap;setRmStatus();if(S.fx!==false)$('#modal').style.background='#0B0F1A88'}
/* ---- بازی دوباره (محلی / AI / آنلاین) ---- */
let rmMine=false,rmTheirs=false;
function setRmStatus(){const st=$('#rmStatus');if(!st)return;st.textContent=rmMine?tr('rmWait'):(rmTheirs?tr('rmAsk'):'')}
function hostStartRematch(){const first=Math.random()<.5?1:2;NET.send({t:'start',first,map:curMap});$('#modal').classList.remove('on');newGame(false,first,curMap);broadcastState()}
function rematchTap(){
 if(!onlineMode){$('#modal').classList.remove('on');newGame(aiMode,undefined,curMap);return}
 rmMine=true;NET.send({t:'rematch'});
 const b=$('#bAgain');if(b){b.disabled=true;b.style.opacity=.6}
 setRmStatus();
 if(rmTheirs&&onlineMode==='host')hostStartRematch()}
/* فاز ۵: hold 3 نوبت متوالی + ترمیم روی خانه‌های Repair */
function endTurn(){if(over)return;
 if(!_auto)SFX.end();
 const held=OBJ.every(k=>{const x=units.find(u=>u.hp>0&&key(u.q,u.r)===k);return x&&x.owner===turn});
 /* برد با نگه‌داشتن هر ۳ خانهٔ بنفش در ۳ نوبت پشت‌سرهم (قانون contested حذف شد) */
 if(held)holdStreak[turn]++;else holdStreak[turn]=0;
 if(holdStreak[turn]>=3){over=true;refresh();return gameOver(turn,'obj')}
 turn=turn===1?2:1;ap=2;turnEnd=performance.now()+TURN_SEC*1000;sel=null;moveSet=new Set();atkSet=new Set();healSet=new Set();
 units.forEach(u=>{if(u.owner===turn&&u.hp>0){u.hasMoved=false;u.hasAttacked=false;if(u.cooldown>0)u.cooldown--;
   if(REPAIR.has(key(u.q,u.r))&&u.hp<u.maxHp){const h=Math.min(2,u.maxHp-u.hp);u.hp+=h;
     const p=hexToPixel(u.q,u.r);fx.push({k:'dmg',x:p.x,y:p.y,txt:'+'+h,t0:performance.now(),col:C.cyan,dur:750});fxHeal(p.x,p.y)}}});
 refresh();
 broadcastState();   /* همگام‌سازی پس از تعویض نوبت */
 if(aiMode&&turn===2&&!over)setTimeout(AITurn,400);}
/* ---------- رندر Canvas ---------- */
const cv=$('#cv'),ctx=cv.getContext('2d');let size=30,ox=0,oy=0,W=0,H=0;
/* ===== v1.7 — Visual FX: particles, shockwaves, shake, move trails ===== */
const RM=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
function fxBurst(x,y,col,n,spd,dur,r,d){if(S.fx===false)return;if(_q>=1)n=Math.ceil(n*.6);const t0=performance.now()+(d||0);
 for(let i=0;i<n;i++){const a=Math.random()*6.283,s=spd*(.35+Math.random()*.9);
  fx.push({k:'spark',x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,t0,dur:dur*(.6+Math.random()*.6),col,r:r*(.6+Math.random()*.8)})}}
function fxRing(x,y,col,mr,dur,w,d){if(S.fx===false)return;fx.push({k:'ring',x,y,col,mr,w:w||3,t0:performance.now()+(d||0),dur})}
function fxShakeLater(a,d){if(RM||S.fx===false)return;const f=()=>{shake=Math.max(shake,a);shakeT=performance.now()};d?setTimeout(f,d):f()}
function fxMuzzle(x,y,col){fxBurst(x,y,col,6,size*3,230,size*.07,0);fxRing(x,y,col,size*.5,200,2,0)}
function fxImpact(x,y,col,kill,core,big,d){
 if(kill){
  fxBurst(x,y,col,30,size*8,760,size*.11,d);
  fxBurst(x,y,'#ffffff',12,size*5,480,size*.07,d);
  fxRing(x,y,col,size*(core?2.8:1.9),640,4,d);
  fxRing(x,y,'#ffffff',size*1.1,380,2,d);
  if(core){fxRing(x,y,col,size*3.6,900,3,(d||0)+120);fxBurst(x,y,col,24,size*10,1000,size*.12,(d||0)+80)}
  fxShakeLater(size*(core?.95:.5),d);
  if(core){doFlash(.5,d);doPunch(.045,d)}else doPunch(.012,d);
 }else{
  fxBurst(x,y,col,big?18:10,size*(big?6.5:4.5),big?520:390,size*.09,d);
  fxRing(x,y,col,size*(big?1.25:.85),big?420:300,3,d);
  fxShakeLater(size*(big?.3:.14),d);
 }}
function fxHeal(x,y,d){if(S.fx===false)return;const t0=performance.now()+(d||0);
 for(let i=0;i<14;i++)fx.push({k:'spark',x:x+(Math.random()-.5)*size*.9,y:y+size*.35,vx:(Math.random()-.5)*size*.9,vy:-size*(1.8+Math.random()*1.8),fr:1.2,
  t0:t0+i*38,dur:750+Math.random()*350,col:i%2?C.cyan:'#9dffd0',r:size*.07,plus:i%3===0});
 fxRing(x,y+size*.3,C.cyan,size*.95,520,2,d)}
function fxTrail(x,y,u,now){if(S.fx===false)return;
 if(!u._tr||now-u._tr>42){u._tr=now;
  fx.push({k:'ghost',x,y,type:u.type,owner:u.owner,t0:now,dur:300});
  fxBurst(x,y+size*.45,'#8b93a7',1,size*.9,380,size*.06,0)}}
/* ===== v2.1 — انیمیشن‌های بهتر: پرش با کمان، فشردگی هنگام فرود، حملهٔ پرتابی (lunge)، عقب‌نشینی ضربه، پالس خانه ===== */
const _eo=t=>1-Math.pow(1-t,3),_eio=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
let cellFl={},_pxFxDrawn=false,punchFx=null,sweepFx=null,_q=0,_qBad=0,_qGood=0,_qRec=0,_qHold=0;
/* ===== v2.2 — مرحلهٔ ۳: موج نوری شروع نوبت، شعاع ترمیم، فلش و ضربهٔ دوربین هنگام نابودی، کیفیت خودکار ===== */
function punchZoom(now){if(!punchFx)return 1;const k=(now-punchFx.t0)/punchFx.dur;if(k<0)return 1;if(k>=1){punchFx=null;return 1}return 1+punchFx.amp*Math.sin(k*Math.PI)*(1-k)}
function doPunch(amp,d){if(S.fx===false||RM)return;punchFx={t0:performance.now()+(d||0),dur:520,amp}}
function doFlash(a,d,col){if(S.fx===false||RM)return;fx.push({k:'flash',t0:performance.now()+(d||0),dur:520,col:col||'#ffffff',a})}
function doSweep(owner){if(S.fx===false||RM)return;sweepFx={t0:performance.now(),owner}}
/* کیفیت خودکار: اگر چند نیم‌ثانیه پشت‌سرهم FPS کم بود، فیلتر درخشش را سبک‌تر/خاموش می‌کند */
function applyQ(){if(!PX)return;
 if(_q>=2){PX.glowC.filters=null;return}
 let f=PX.glowC.filters&&PX.glowC.filters[0];
 if(!f){f=new PIXI.BlurFilter(5,2);f.blendMode=PIXI.BLEND_MODES.ADD;PX.glowC.filters=[f]}
 if(_q===1){f.quality=1;f.resolution=.35}else{f.quality=2;f.resolution=.5}}
function autoQ(v,now){
 if(!PX||introActive||over||document.hidden||now<_qHold)return;
 if(v<38)_qBad++;else _qBad=Math.max(0,_qBad-1);
 if(_qBad>=4&&_q<2){_qBad=0;_qGood=0;_q++;applyQ();return}
 /* بازگشت به کیفیت بالاتر: اگر ۲۰ ثانیه FPS خوب بود (حداکثر دو بار) تا افت لحظه‌ای کیفیت را برای همیشه پایین نگه ندارد */
 if(v>=50)_qGood++;else _qGood=0;
 if(_q>0&&_qGood>=40&&_qRec<2){_qGood=0;_qRec++;_q--;applyQ()}}
function cellPulse(k,col){if(S.fx===false||RM)return;cellFl[k]={t0:performance.now(),col}}
function animOff(u,now){let dx=0,dy=0,ay=0,sx=1,sy=1;
 if(S.fx===false||RM)return{dx,dy,ay,sx,sy};
 if(u.mv){const k=Math.min(1,(now-u.mv.t)/200),w=Math.sin(k*Math.PI);ay-=w*size*.28;sy=1+.08*w;sx=1-.05*w}
 else if(u._land){const k=(now-u._land)/240;if(k<1){const q=Math.sin(Math.min(1,k*2)*Math.PI/2)*(1-k);sy=1-.2*q;sx=1+.12*q}else u._land=0}
 if(u.lunge){const L=u.lunge,k=(now-L.t0)/300;if(k>=1)u.lunge=null;else if(k>=0){const a=k<.35?_eo(k/.35):1-_eio((k-.35)/.65);dx+=L.ux*a*size*L.amp;dy+=L.uy*a*size*L.amp}}
 if(u.kb){const B=u.kb,k=(now-B.t0)/300;if(k>=1)u.kb=null;else if(k>=0){const a=Math.pow(1-k,2)*Math.min(1,k*6);dx+=B.ux*a*size*.26;dy+=B.uy*a*size*.26}}
 return{dx,dy,ay,sx,sy}}
function fxLand(x,y,u){u._land=performance.now();cellPulse(key(u.q,u.r),PAL[u.owner].m);fxRing(x,y+size*.35,PAL[u.owner].m,size*.8,300,2,0);fxBurst(x,y+size*.45,'#9aa3b8',6,size*1.7,360,size*.06,0)}
function drawGhost(type,owner,x,y){const pal=PAL[owner],bx=size*1.55;ctx.translate(x-bx/2,y-bx/2-size*.1);ctx.scale(bx/100,bx/100);
 for(const[p,t]of ICON[type]){ctx.fillStyle=pal[t];ctx.fill(p)}}

/* ===== v1.8 — turn banner, objective pulses, victory confetti, idle motion, tile pop-in ===== */
function fxWatch(){
 if(!units||over||S.fx===false)return;
 if(turn!==lastTurnSeen){lastTurnSeen=turn;if(!(aiMode&&turn===2)&&(!onlineMode||myTurn()))vib(60);
  const nm=(aiMode&&turn===2)?tr('aiName'):tr('player')+' '+turn;
  fx.push({k:'banner',owner:turn,txt:nm,sub:(onlineMode&&myTurn())?tr('you'):'',t0:performance.now(),dur:1100});
  const core=units.find(u=>u.hp>0&&u.type==='core'&&u.owner===turn);
  if(core){const p=hexToPixel(core.q,core.r),c=turn===1?C.cyan:C.red;fxRing(p.x,p.y,c,size*1.7,800,3,0);fxRing(p.x,p.y,c,size*1.1,600,2,150)}
  doSweep(turn)}
 OBJ.forEach(k=>{const o=units.find(u=>u.hp>0&&key(u.q,u.r)===k),ow=o?o.owner:0;
  if(objPrev[k]!==undefined&&ow&&objPrev[k]!==ow){const[q,r]=k.split(',').map(Number),p=hexToPixel(q,r),c=ow===1?C.cyan:C.red;
   fxRing(p.x,p.y,c,size*1.5,650,3,200);fxBurst(p.x,p.y,c,12,size*4,550,size*.07,200)}
  objPrev[k]=ow});
 for(const o of[1,2]){
  if(holdStreak[o]>holdPrev[o]){const c=o===1?C.cyan:C.red;
   OBJ.forEach((k,i)=>{const[q,r]=k.split(',').map(Number),p=hexToPixel(q,r);
    fxRing(p.x,p.y,c,size*(1.4+.35*holdStreak[o]),800,3,i*130);fxBurst(p.x,p.y,c,8+4*holdStreak[o],size*4.5,650,size*.08,i*130)});
   fxShakeLater(size*.12*holdStreak[o],0)}
  holdPrev[o]=holdStreak[o]}
 if(moveSet!==_pm||atkSet!==_pa||healSet!==_ph||sel!==_ps){_pm=moveSet;_pa=atkSet;_ph=healSet;_ps=sel;hlT=performance.now()}}
function popK(h){if(S.fx===false)return 1;const d=sel?dist(sel,h):0,t=Math.max(0,Math.min(1,(performance.now()-hlT-d*40)/230)),c1=1.70158,c3=c1+1;
 return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)}
function objGlow(x,y,k){if(S.fx===false)return;const o=units.find(u=>u.hp>0&&key(u.q,u.r)===k);if(!o)return;
 const c=o.owner===1?C.cyan:C.red,p=.5+.5*Math.sin(performance.now()/260);
 ctx.save();hexPath(x,y,size*.94);ctx.globalAlpha=.10+.12*p;ctx.fillStyle=c;ctx.fill();
 ctx.globalAlpha=.55+.4*p;ctx.strokeStyle=c;ctx.lineWidth=2.5;ctx.stroke();ctx.restore()}
function fxVictory(w,why){if(S.fx===false)return;
 const col=w===1?C.cyan:C.red,cols=[col,C.amber,'#ffffff',C.violet],b=why==='core'?700:0,t0=performance.now()+b;
 for(let i=0;i<110;i++)fx.push({k:'conf',x:Math.random()*W,y:-size*(.5+Math.random()*6),vx:(Math.random()-.5)*size*2.2,vy:size*(2.2+Math.random()*2.4),
  sw:2+Math.random()*3,rot:Math.random()*6.28,vr:(Math.random()-.5)*10,col:cols[i%4],w:size*(.14+Math.random()*.12),h:size*(.24+Math.random()*.2),
  t0:t0+Math.random()*900,dur:3800+Math.random()*1400});
 for(let i=0;i<6;i++){const x=W*(.15+Math.random()*.7),y=H*(.15+Math.random()*.5),d=b+250+i*320;
  fxBurst(x,y,cols[i%4],22,size*7,900,size*.1,d);fxRing(x,y,cols[i%4],size*2.2,700,3,d)}
 if(why==='obj')OBJ.forEach((k,i)=>{const[q,r]=k.split(',').map(Number),p=hexToPixel(q,r);
  fxRing(p.x,p.y,col,size*2,800,3,i*140);fxBurst(p.x,p.y,col,16,size*6,800,size*.09,i*140)})}
function drawFx(e,k,now){ctx.save();
 if(e.k==='spark'){const t=(now-e.t0)/1000,fr=e.fr||4,d=(1-Math.exp(-fr*t))/fr,x=e.x+e.vx*d,y=e.y+e.vy*d,a=Math.pow(1-k,1.3),r=e.r*(1-.55*k);
  ctx.globalCompositeOperation='lighter';ctx.fillStyle=e.col;
  ctx.globalAlpha=a*.28;ctx.beginPath();ctx.arc(x,y,r*2.4,0,7);ctx.fill();
  ctx.globalAlpha=a;
  if(e.plus){const w=r*3;ctx.fillRect(x-w,y-w*.3,w*2,w*.6);ctx.fillRect(x-w*.3,y-w,w*.6,w*2)}
  else{ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill()}}
 else if(e.k==='ring'){const q=1-Math.pow(1-k,3);ctx.globalCompositeOperation='lighter';ctx.strokeStyle=e.col;
  ctx.globalAlpha=(1-k)*.9;ctx.lineWidth=Math.max(.6,e.w*(1-k));ctx.beginPath();ctx.arc(e.x,e.y,e.mr*q,0,7);ctx.stroke()}
 else if(e.k==='ghost'){ctx.globalAlpha=.32*(1-k);drawGhost(e.type,e.owner,e.x,e.y)}
 else if(e.k==='conf'){const t=(now-e.t0)/1000,x=e.x+e.vx*t+Math.sin(t*e.sw)*size*.5,y=e.y+e.vy*t;
  if(y>-size&&y<H+size){ctx.globalAlpha=Math.min(1,(1-k)*4);ctx.translate(x,y);ctx.rotate(e.rot+e.vr*t);ctx.scale(1,Math.cos(t*e.sw*2));
   ctx.fillStyle=e.col;ctx.fillRect(-e.w/2,-e.h/2,e.w,e.h)}}
 else if(e.k==='banner'){const col=e.owner===1?C.cyan:C.red,eIn=.22,eOut=.72;let off=0;
  if(k<eIn){const q=k/eIn;off=-Math.pow(1-q,3)*W}else if(k>eOut){const q=(k-eOut)/(1-eOut);off=q*q*q*W}
  const h=size*1.7,cy=H*.4;ctx.translate(off,0);
  const g=ctx.createLinearGradient(0,0,W,0);g.addColorStop(0,col+'00');g.addColorStop(.2,col+'55');g.addColorStop(.8,col+'55');g.addColorStop(1,col+'00');
  ctx.fillStyle='#0B0F1A99';ctx.fillRect(0,cy-h/2,W,h);ctx.fillStyle=g;ctx.fillRect(0,cy-h/2,W,h);
  ctx.fillStyle=col;ctx.globalAlpha=.9;ctx.fillRect(0,cy-h/2,W,2);ctx.fillRect(0,cy+h/2-2,W,2);ctx.globalAlpha=1;
  ctx.textAlign='center';ctx.textBaseline='middle';ctx.shadowColor=col;ctx.shadowBlur=size*.5;ctx.fillStyle='#fff';
  try{ctx.letterSpacing=Math.round(size*.08)+'px'}catch(_){}
  ctx.font='800 '+Math.round(size*.8)+'px "NC Fa","NC Mi","NC Sans",system-ui';ctx.fillText(e.txt,W/2,cy-(e.sub?size*.15:0));
  if(e.sub){ctx.shadowBlur=0;ctx.fillStyle=col;ctx.font='700 '+Math.round(size*.4)+'px "NC Fa","NC Mi","NC Sans",system-ui';ctx.fillText(e.sub,W/2,cy+size*.5)}}
 ctx.restore()}

function resize(){const b=$('#wrap').getBoundingClientRect(),d=PX?Math.min(devicePixelRatio||1,2):(devicePixelRatio||1);
 W=b.width;H=b.height;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0);
 size=Math.min(W/(Math.sqrt(3)*(N+.5)),H/(1.5*(N-1)+2));
 ox=(W-Math.sqrt(3)*size*(N+.5))/2+Math.sqrt(3)*size/2;oy=(H-(1.5*(N-1)+2)*size)/2+size;
 if(PX){try{PX.app.renderer.resize(Math.max(2,W),Math.max(2,H));PX.glowC.filterArea=new PIXI.Rectangle(-20,-20,W+40,H+40);pxCheck()}catch(e){pxDisable()}}else pxInit();
 draw();}
const hexToPixel=(q,r)=>({x:ox+size*Math.sqrt(3)*(q+r/2),y:oy+size*1.5*r});
function pixelToHex(x,y){x-=ox;y-=oy;const fq=(Math.sqrt(3)/3*x-y/3)/size,fr=2/3*y/size;
 let q=Math.round(fq),r=Math.round(fr),s=Math.round(-fq-fr);
 const dq=Math.abs(q-fq),dr=Math.abs(r-fr),ds=Math.abs(s+fq+fr);
 if(dq>dr&&dq>ds)q=-r-s;else if(dr>ds)r=-q-s;return{q,r};}
function hexPath(x,y,s){ctx.beginPath();for(let i=0;i<6;i++){const a=Math.PI/180*(60*i-30);
 const px=x+s*Math.cos(a),py=y+s*Math.sin(a);i?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.closePath();}
function tile(x,y,stroke,fill,glow){hexPath(x,y,size*.94*tileScale);
 const pl=.7+.3*Math.sin(performance.now()/280);
 if(fill){ctx.fillStyle=fill;ctx.fill()}
 if(glow){ctx.save();ctx.strokeStyle=stroke;ctx.lineJoin='round';ctx.globalAlpha=.10*pl;ctx.lineWidth=11;ctx.stroke();ctx.globalAlpha=.18*pl;ctx.lineWidth=6;ctx.stroke();ctx.restore()}
 ctx.strokeStyle=stroke;ctx.lineWidth=1.5;ctx.stroke();}
const _c=(x,y,r)=>`M${x-r} ${y}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0`,_r=(x,y,w,h)=>`M${x} ${y}h${w}v${h}h${-w}z`;
const _h=r=>[0,1,2,3,4,5].map(i=>{const a=Math.PI/180*(60*i-90);return(i?'L':'M')+(50+r*Math.cos(a)).toFixed(1)+' '+(50+r*Math.sin(a)).toFixed(1)}).join('')+'Z';
const ICON={
 soldier:[[_r(40,62,7,18),'d'],[_r(53,62,7,18),'d'],[_r(38,36,24,26),'m'],[_c(36,42,6),'m'],[_r(58,41,26,6),'m'],[_c(86,44,4),'l'],[_c(50,25,11),'l'],[_r(44,23,12,4),'d']],
 archer:[[_r(42,62,6,18),'d'],[_r(52,62,6,18),'d'],[_r(40,36,19,27),'l'],[_c(38,42,5),'m'],[_r(66,12,5,68),'m'],[_c(68.5,10,5),'l'],[_c(49,26,10),'l'],[_r(43,24,11,3),'d']],
 heavy:[[_r(36,66,11,20),'d'],[_r(54,66,11,20),'d'],[_r(33,34,34,33),'d'],[_r(22,30,17,18),'m'],[_r(62,30,17,18),'m'],[_r(38,48,24,4),'m'],[_r(70,44,16,28),'l'],[_c(90,60,3),'l'],[_c(50,22,11),'l'],[_r(44,20,12,4),'d']],
 support:[[_r(42,64,6,18),'d'],[_r(52,64,6,18),'d'],[_r(40,38,20,27),'m'],[_c(28,50,8),'d'],[_c(28,50,3.5),'l'],[_c(72,50,8),'d'],[_c(72,50,3.5),'l'],[_r(48,44,4,14),'l'],[_r(43,49,14,4),'l'],[_c(50,26,10),'l']],
 sniper:[[_r(43,68,6,16),'d'],[_r(52,68,6,16),'d'],[_r(41,42,19,28),'m'],[_c(38,48,6),'m'],[_r(58,44,38,3),'m'],[_c(74,39,7),'d'],[_c(74,39,3.5),'l'],[_r(95,43,4,5),'l'],[_c(50,30,10),'l'],[_r(44,27,12,4),'d']],
 core:[[_r(49,4,2,16),'m'],[_r(49,80,2,16),'m'],[_r(4,49,16,2),'m'],[_r(80,49,16,2),'m'],[_h(28),'m'],[_h(17),'l'],[_c(50,50,6),'w']]};
for(const k in ICON)ICON[k]=ICON[k].map(([d,t])=>[new Path2D(d),t]);
const PAL={1:{m:C.cyan,d:'#0088A0',l:'#8CF4FF',w:'#E8FDFF'},2:{m:C.red,d:'#A8203C',l:'#FF9CAD',w:'#FFE8EC'}};
function drawUnit(u,x,y,fl){const col=u.owner===1?C.cyan:C.red,pal=PAL[u.owner],bx=size*1.55;
 ctx.fillStyle=col+'33';ctx.beginPath();ctx.ellipse(x,y+size*.5,size*.6,size*.24,0,0,7);ctx.fill();
 ctx.save();const done=(u.hasMoved?1:0)+(u.hasAttacked?1:0);
 if(u.owner===turn&&u.type!=='core'&&done>0)ctx.globalAlpha*=(1-done*.15);
 if(u.type==='core'){const g=ctx.createRadialGradient(x,y,0,x,y,size*(.8+(S.fx===false?0:.1*Math.sin(performance.now()/400))));g.addColorStop(0,col+'88');g.addColorStop(1,col+'00');ctx.fillStyle=g;ctx.fillRect(x-size,y-size,size*2,size*2)}
 ctx.translate(x-bx/2,y-bx/2-size*.1);ctx.scale(bx/100,bx/100);
 for(const[p,t]of ICON[u.type]){ctx.fillStyle=pal[t];ctx.fill(p)}
 ctx.restore();
 if(fl>0){ctx.save();ctx.globalAlpha*=fl;ctx.fillStyle=C.red+'99';ctx.strokeStyle=C.red;ctx.lineWidth=3;ctx.beginPath();ctx.arc(x,y,size*.62,0,7);ctx.fill();ctx.stroke();ctx.restore()}
 if(u.type!=='core'){const w=size*.9;ctx.fillStyle='#0008';ctx.fillRect(x-w/2,y+size*.66,w,4);ctx.fillStyle=col;ctx.fillRect(x-w/2,y+size*.66,w*u.hp/u.maxHp,4)}}

/* ===== v2.0 — موتور گرافیکی PixiJS (WebGL) =====
   خانه‌ها، واحدها، نوار سلامت و درخشش واقعی (bloom) با Pixi؛ افکت‌ها (گلوله، ذرات، بنر، اعداد) روی Canvas بالای آن.
   اگر WebGL نبود یا خطایی رخ داد، خودکار به رسم قبلی (Canvas) برمی‌گردد. */
let PX=null;
const _hx=c=>parseInt(c.slice(1,7),16);
function pxSupported(){try{return typeof PIXI!=='undefined'&&PIXI.utils.isWebGLSupported()}catch(e){return false}}
function pxDisable(){const c=$('#pcv');if(PX){try{PX.app.destroy(false,{children:true,texture:true,baseTexture:true})}catch(e){}}PX=null;if(c)c.style.display='none'}
function pxInit(){
 if(PX||S.gfx==='canvas'||!pxSupported())return;
 try{
  const old=$('#pcv'),c=document.createElement('canvas');c.id='pcv';c.style.display='block';old.replaceWith(c);
  const app=new PIXI.Application({view:c,width:Math.max(2,W),height:Math.max(2,H),backgroundAlpha:0,antialias:true,
   resolution:Math.min(devicePixelRatio||1,2),autoDensity:true,autoStart:false,sharedTicker:false});
  app.ticker.stop();
  const world=new PIXI.Container(),baseC=new PIXI.Container(),ownC=new PIXI.Container(),hiC=new PIXI.Container(),
   glowC=new PIXI.Container(),unitC=new PIXI.Container(),ring=new PIXI.Graphics(),ghostC=new PIXI.Container(),fxC=new PIXI.Container(),fxG=new PIXI.Graphics();
  fxG.blendMode=PIXI.BLEND_MODES.ADD;fxC.addChild(fxG);
  const blur=new PIXI.BlurFilter(5,2);blur.resolution=.5;blur.blendMode=PIXI.BLEND_MODES.ADD;glowC.filters=[blur];   /* درخشش نئونی واقعی؛ کیفیت و رزولوشن پایین برای سبک ماندن روی گوشی */
  world.addChild(baseC,ownC,hiC,glowC,unitC,ghostC,fxC,ring);app.stage.addChild(world);
  PX={app,world,baseC,ownC,hiC,glowC,unitC,ring,ghostC,fxC,fxG,cs:{},units:new Map(),T:{},UT:{},CG:{},SH:{},FL:null,spPool:[],gPool:[],size:0,ox:0,oy:0};
  c.addEventListener('webglcontextlost',e=>{e.preventDefault();pxDisable()});
  applyQ();
  glowC.filterArea=new PIXI.Rectangle(-20,-20,Math.max(2,W)+40,Math.max(2,H)+40);   /* ناحیهٔ ثابت: بدون محاسبهٔ مرزها در هر فریم */
  if(size>8)pxBuild();
 }catch(err){console.warn('PIXI init failed',err);pxDisable()}}
function pxCheck(){if(PX&&size>8&&(PX.size!==size||PX.ox!==ox||PX.oy!==oy))pxBuild()}
function pxBuild(){
 if(!PX||!(size>8))return;
 const A=PX.app,R=Math.ceil(size*1.05)+4,reg=new PIXI.Rectangle(-R,-R,2*R,2*R);
 for(const m of[PX.T,PX.UT,PX.CG,PX.SH])for(const t of Object.values(m))try{t.destroy(true)}catch(e){}
 if(PX.FL)try{PX.FL.destroy(true)}catch(e){}
 for(const c of[PX.baseC,PX.ownC,PX.hiC,PX.glowC,PX.unitC,PX.ghostC])c.removeChildren().forEach(o=>{try{o.destroy({children:true})}catch(e){}});
 PX.fxC.removeChildren().forEach(o=>{if(o!==PX.fxG)try{o.destroy()}catch(e){}});PX.fxC.addChild(PX.fxG);PX.spPool=[];PX.gPool=[];
 PX.units=new Map();PX.cs={};
 const r0=size*.94,pts=[];for(let i=0;i<6;i++){const a=Math.PI/180*(60*i-30);pts.push(r0*Math.cos(a),r0*Math.sin(a))}
 const gen=fn=>{const g=new PIXI.Graphics();fn(g);const t=A.renderer.generateTexture(g,{region:reg,resolution:2});g.destroy();return t};
 const H6=(g,sc,sa,fc,fa,w)=>{g.lineStyle({width:w||1.5,color:_hx(sc),alpha:sa,join:PIXI.LINE_JOIN.ROUND});if(fc)g.beginFill(_hx(fc),fa);g.drawPolygon(pts);if(fc)g.endFill()};
 const T=PX.T={};
 T.norm=gen(g=>H6(g,C.cyan,.30));
 T.g1a=gen(g=>H6(g,C.cyan,.10));
 T.obj=gen(g=>{H6(g,C.violet,1,C.violet,.25);g.lineStyle(0);g.beginFill(_hx(C.violet));const d=size*.22;g.drawPolygon([0,-d,d,0,0,d,-d,0]);g.endFill()});
 T.obst=gen(g=>{H6(g,'#5a6276',1,'#1a2030',1);const d=size*.3;g.lineStyle({width:2.5,color:0x8b93a7,cap:PIXI.LINE_CAP.ROUND});g.moveTo(-d,-d);g.lineTo(d,d);g.moveTo(d,-d);g.lineTo(-d,d)});
 T.rep=gen(g=>{H6(g,C.cyan,1,C.cyan,.10);g.lineStyle(0);g.beginFill(_hx(C.cyan));g.drawRect(-size*.22,-size*.05,size*.44,size*.1);g.drawRect(-size*.05,-size*.22,size*.1,size*.44);g.endFill()});
 T.sel=gen(g=>H6(g,C.amber,1,C.amber,.20));
 T.move=gen(g=>H6(g,C.cyan,1,C.cyan,.15));
 T.atk=gen(g=>H6(g,C.red,1,C.red,.15));
 T.heal=gen(g=>H6(g,C.violet,1,C.violet,.25));
 T.strokeW=gen(g=>H6(g,'#ffffff',1,null,0,3));
 T.ownS=gen(g=>H6(g,'#ffffff',1,null,0,2.5));
 T.ownF=gen(g=>{g.lineStyle(0);g.beginFill(0xffffff,1);g.drawPolygon(pts);g.endFill()});
 /* بافت واحدها: از همان آیکون‌های برداری (Path2D) روی بوم موقت، ۲× */
 const res=2,Sz=Math.ceil(size*3);
 const mkc=(w,h)=>{const c=document.createElement('canvas');c.width=Math.ceil(w*res);c.height=Math.ceil(h*res);const x=c.getContext('2d');x.scale(res,res);return[c,x]};
 for(const o of[1,2])for(const type of Object.keys(ICON)){
  const[c,x]=mkc(Sz,Sz),col=o===1?C.cyan:C.red,pal=PAL[o],bx=size*1.55,cx=Sz/2,cy=Sz/2;
  x.translate(cx-bx/2,cy-bx/2-size*.1);x.scale(bx/100,bx/100);for(const[p,t]of ICON[type]){x.fillStyle=pal[t];x.fill(p)}
  PX.UT[type+o]=PIXI.Texture.from(c,{resolution:res})}
 PX.SH={};for(const o of[1,2]){const col=o===1?C.cyan:C.red,[c,x]=mkc(size*1.4,size*.6);x.fillStyle=col+'33';x.beginPath();x.ellipse(size*.7,size*.3,size*.6,size*.24,0,0,7);x.fill();PX.SH[o]=PIXI.Texture.from(c,{resolution:res})}
 {const[c,x]=mkc(64,64),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.22,'rgba(255,255,255,.85)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);T.soft=PIXI.Texture.from(c,{resolution:res})}
 {const[c,x]=mkc(128,8),g=x.createLinearGradient(0,0,128,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,1)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,128,8);T.sweep=PIXI.Texture.from(c,{resolution:res})}
 {const[c,x]=mkc(64,64);x.shadowColor='#fff';x.shadowBlur=3;x.fillStyle='#fff';x.fillRect(12,29,40,6);x.fillRect(29,12,6,40);T.plus=PIXI.Texture.from(c,{resolution:res})}
 for(const o of[1,2]){const col=o===1?C.cyan:C.red,[c,x]=mkc(size*2,size*2),g=x.createRadialGradient(size,size,0,size,size,size*.9);
  g.addColorStop(0,col+'88');g.addColorStop(1,col+'00');x.fillStyle=g;x.fillRect(0,0,size*2,size*2);PX.CG[o]=PIXI.Texture.from(c,{resolution:res})}
 {const[c,x]=mkc(size*2,size*2);x.fillStyle=C.red+'99';x.strokeStyle=C.red;x.lineWidth=3;x.beginPath();x.arc(size,size,size*.62,0,7);x.fill();x.stroke();PX.FL=PIXI.Texture.from(c,{resolution:res})}
 /* اسپرایت هر خانه */
 const SP=t=>{const s=new PIXI.Sprite(t);s.anchor.set(.5);return s};
 PX.selS=SP(T.sel);PX.selG=SP(T.strokeW);PX.selS.visible=PX.selG.visible=false;PX.hiC.addChild(PX.selS);PX.glowC.addChild(PX.selG);
 for(const h of cells){const k=key(h.q,h.r),p=hexToPixel(h.q,h.r),cs={base:SP(T.norm),ownF:SP(T.ownF),ownS:SP(T.ownS),hi:SP(T.move),gl:SP(T.strokeW),fl:SP(T.ownF)};
  for(const s of Object.values(cs))s.position.set(p.x,p.y);
  cs.ownF.visible=cs.ownS.visible=cs.hi.visible=cs.gl.visible=cs.fl.visible=false;
  PX.baseC.addChild(cs.base);PX.ownC.addChild(cs.ownF,cs.ownS,cs.fl);PX.hiC.addChild(cs.hi);PX.glowC.addChild(cs.gl);PX.cs[k]=cs}
 PX.hiC.addChildAt(PX.selS,0);
 PX.sweepS=SP(T.sweep);PX.sweepS.blendMode=PIXI.BLEND_MODES.ADD;PX.sweepS.visible=false;PX.ownC.addChild(PX.sweepS);
 PX.size=size;PX.ox=ox;PX.oy=oy;
 try{A.renderer.render(A.stage)}catch(e){}   /* گرم‌کردن شیدرها قبل از اولین بازی */
}
function pxMakeUnit(u){
 const c=new PIXI.Container();let cg=null;
 if(u.type==='core'){cg=new PIXI.Sprite(PX.CG[u.owner]);cg.anchor.set(.5);c.addChild(cg)}
 const sh=new PIXI.Sprite(PX.SH[u.owner]);sh.anchor.set(.5);sh.position.set(0,size*.5);c.addChild(sh);
 const body=new PIXI.Sprite(PX.UT[u.type+u.owner]);body.anchor.set(.5);c.addChild(body);
 const wg=new PIXI.Sprite(PX.T.soft);wg.anchor.set(.5);wg.blendMode=PIXI.BLEND_MODES.ADD;wg.visible=false;c.addChild(wg);
 const flash=new PIXI.Sprite(PX.FL);flash.anchor.set(.5);flash.visible=false;c.addChild(flash);
 const hpG=u.type==='core'?null:new PIXI.Graphics();if(hpG)c.addChild(hpG);
 PX.unitC.addChild(c);const U={c,sh,body,wg,flash,hpG,cg,hp:-1,mhp:-1,sz:size};PX.units.set(u.id,U);return U}
function pxFrame(now){
 if(!(size>8))return;   /* صفحهٔ بازی پنهان است (مثلاً منو): واحدی با اندازهٔ صفر نساز */
 const T=PX.T,pl=.7+.3*Math.sin(now/280),gp=.5+.5*Math.sin(now/260),own={};
 for(const u of units)if(u.hp>0){const k=key(u.q,u.r);if(OBJ.includes(k))own[k]=u}
 for(const h of cells){const k=key(h.q,h.r),s=PX.cs[k],mv=moveSet.has(k),at=atkSet.has(k),hl=healSet.has(k),any=mv||at||hl;
  let bt=null,gcol=null;
  if(OBJ.includes(k)){bt=T.obj;gcol=C.violet}else if(OBSTACLES.has(k))bt=T.obst;else if(REPAIR.has(k)){bt=T.rep;gcol=C.cyan}else if(S.grid)bt=T.norm;else if(any)bt=T.g1a;
  s.base.visible=!!bt;if(bt)s.base.texture=bt;
  const o=own[k],so=!!o&&S.fx!==false;s.ownF.visible=s.ownS.visible=so;
  if(so){const c=_hx(o.owner===1?C.cyan:C.red);s.ownF.tint=s.ownS.tint=c;s.ownF.alpha=.10+.12*gp;s.ownS.alpha=.55+.4*gp}
  if(any){const ts=popK(h);s.hi.texture=hl?T.heal:at?T.atk:T.move;s.hi.scale.set(ts);s.hi.visible=true;gcol=hl?C.violet:at?C.red:C.cyan;s.gl.scale.set(ts)}
  else{s.hi.visible=false;s.gl.scale.set(1)}
  s.gl.visible=!!gcol;if(gcol){s.gl.tint=_hx(gcol);s.gl.alpha=.9*pl}
  const cf=cellFl[k];if(cf){const q=(now-cf.t0)/380;if(q>=1){delete cellFl[k];s.fl.visible=false}else{s.fl.visible=true;s.fl.tint=_hx(cf.col);s.fl.alpha=.5*Math.pow(1-q,2)}}else s.fl.visible=false}
 if(sel){const p=hexToPixel(sel.q,sel.r);PX.selS.position.set(p.x,p.y);PX.selG.position.set(p.x,p.y);PX.selS.visible=PX.selG.visible=true;PX.selG.tint=_hx(C.amber);PX.selG.alpha=.9*pl}
 else PX.selS.visible=PX.selG.visible=false;
 if(sweepFx&&PX.sweepS){const k=(now-sweepFx.t0)/1000,sw=PX.sweepS;   /* موج نوری شروع نوبت: از سمت بازیکن فعال به سمت مقابل */
  if(k>=1){sweepFx=null;sw.visible=false}else{const p1=sweepFx.owner===1,x0=p1?-.15*W:1.15*W,y0=p1?1.15*H:-.15*H,x1=p1?1.15*W:-.15*W,y1=p1?-.15*H:1.15*H,e=_eio(k);
   sw.visible=true;sw.position.set(x0+(x1-x0)*e,y0+(y1-y0)*e);sw.rotation=Math.atan2(y1-y0,x1-x0);sw.scale.set(size*6/128,Math.hypot(W,H)*1.4/8);
   sw.tint=_hx(p1?C.cyan:C.red);sw.alpha=.3*Math.sin(k*Math.PI)}}
 else if(PX.sweepS)PX.sweepS.visible=false;
 const seen=new Set();let ringAt=null;
 for(const u of units){const dying=u.hp<=0;if(dying&&!u.dieT)continue;
  let p=hexToPixel(u.q,u.r);
  if(u.mv){const k=Math.min(1,(now-u.mv.t)/200),e=k*k*(3-2*k),f=hexToPixel(u.mv.q,u.mv.r);
   p={x:f.x+(p.x-f.x)*e,y:f.y+(p.y-f.y)*e};if(k>=1){u.mv=null;fxLand(p.x,p.y,u)}else fxTrail(p.x,p.y,u,now)}
  const hit=u.hitT&&now-u.hitT<300,tt=now-(u.hitT||0),damp=hit?1-tt/300:0,ao=animOff(u,now),calm=(dying||u.mv||u.type==='core'||RM||S.fx===false);
  const x=p.x+ao.dx+(hit?Math.sin(tt*.05)*6*damp:0),y=p.y+ao.dy+(hit?Math.cos(tt*.06)*3*damp:0);
  const bob=calm?0:Math.sin(now/520+u.q*1.3+u.r*.7)*size*.04,isSel=(u===sel&&u.hp>0),
   lift=(isSel&&S.fx!==false&&!RM)?-size*.07-Math.sin(now/300)*size*.015:0;
  let U=PX.units.get(u.id);if(!U)U=pxMakeUnit(u);seen.add(u.id);
   if(U.sz!==size){U.sz=size;U.sh.position.y=size*.5;U.hp=-1}   /* اگر اندازه عوض شد، سایه و نوار جان دوباره جایگذاری شوند */
  U.c.position.set(x,y);
  const kd=dying?Math.min(1,(now-u.dieT)/400):0;
  let sc=1,al=1,rot=0;   /* مرگ: درخشش سفید، بزرگ‌شدن کوتاه، بعد کوچک‌شدن و چرخش */
  if(dying){sc=kd<.2?1+kd*1.2:Math.max(0,1.24*(1-Math.pow((kd-.2)/.8,2)));al=1-Math.max(0,(kd-.45)/.55);rot=kd*kd*1.4*(u.owner===1?1:-1)}
  U.c.alpha=al;U.c.scale.set(sc);
  const sx=ao.sx*(isSel?1.04:1),sy=ao.sy*(isSel?1.04:1),air=bob+lift+ao.ay;
  U.body.rotation=rot;U.body.scale.set(sx,sy);U.body.position.set(0,air+(1-sy)*size*.55);
  U.sh.scale.set(Math.max(.55,1+Math.min(0,air)/size*2.2));   /* هرچه واحد بالاتر، سایه کوچک‌تر */
  U.wg.visible=dying&&kd<.35;if(U.wg.visible){U.wg.alpha=Math.max(0,1-kd/.35);U.wg.scale.set(size*2.4/64)}
  const done=(u.hasMoved?1:0)+(u.hasAttacked?1:0);U.body.alpha=(u.owner===turn&&u.type!=='core'&&done>0)?(1-done*.15):1;
  const fl=hit?1-(now-u.hitT)/300:0;U.flash.visible=fl>0;U.flash.alpha=Math.max(0,fl);
  if(U.cg)U.cg.scale.set(S.fx===false?1:(.8+.1*Math.sin(now/400))/.9);
  if(U.hpG&&(U.hp!==u.hp||U.mhp!==u.maxHp)){U.hp=u.hp;U.mhp=u.maxHp;const w=size*.9,col=_hx(u.owner===1?C.cyan:C.red);
   U.hpG.clear().beginFill(0x000000,.53).drawRect(-w/2,size*.66,w,4).endFill().beginFill(col).drawRect(-w/2,size*.66,w*u.hp/u.maxHp,4).endFill()}
  if(isSel)ringAt={x,y}}
 for(const[id,U]of PX.units)if(!seen.has(id)){try{PX.unitC.removeChild(U.c);U.c.destroy({children:true})}catch(e){}PX.units.delete(id)}
 PX.ring.clear();if(ringAt){const pu=.5+.5*Math.sin(now/250);PX.ring.lineStyle(2,_hx(C.amber),pu);PX.ring.drawCircle(ringAt.x,ringAt.y,size*(.7+.1*pu))}}
/* ذرات، حلقه‌ها و سایه‌های حرکت روی GPU (additive): اسپرایت‌های قابل‌استفادهٔ مجدد */
function pxFx(now){
 const T=PX.T;let si=0,gi=0;PX.fxG.clear();
 for(const e of fx){if(now<e.t0)continue;const k=(now-e.t0)/e.dur;if(k>=1)continue;
  if(e.k==='spark'){const t=(now-e.t0)/1000,fr=e.fr||4,d=(1-Math.exp(-fr*t))/fr,x=e.x+e.vx*d,y=e.y+e.vy*d,a=Math.pow(1-k,1.3),r=e.r*(1-.55*k);
   let s=PX.spPool[si];if(!s){s=new PIXI.Sprite(T.soft);s.anchor.set(.5);s.blendMode=PIXI.BLEND_MODES.ADD;PX.fxC.addChild(s);PX.spPool.push(s)}si++;
   s.visible=true;s.texture=e.plus?T.plus:T.soft;s.position.set(x,y);s.tint=_hx(e.col);s.alpha=a;s.scale.set(e.plus?r*6/40:r*4.8/64)}
  else if(e.k==='beam'){const a=Math.sin(k*Math.PI)*.9,w=1+.25*Math.sin(now/40);
   PX.fxG.lineStyle({width:9*w,color:_hx(e.col),alpha:a*.28,cap:PIXI.LINE_CAP.ROUND});PX.fxG.moveTo(e.x1,e.y1);PX.fxG.lineTo(e.x2,e.y2);
   PX.fxG.lineStyle({width:3,color:0xffffff,alpha:a,cap:PIXI.LINE_CAP.ROUND});PX.fxG.moveTo(e.x1,e.y1);PX.fxG.lineTo(e.x2,e.y2)}
  else if(e.k==='ring'){PX.fxG.lineStyle({width:Math.max(.6,e.w*(1-k)),color:_hx(e.col),alpha:(1-k)*.9});PX.fxG.drawCircle(e.x,e.y,e.mr*(1-Math.pow(1-k,3)))}
  else if(e.k==='ghost'){let g=PX.gPool[gi];if(!g){g=new PIXI.Sprite(PX.UT[e.type+e.owner]);g.anchor.set(.5);PX.ghostC.addChild(g);PX.gPool.push(g)}gi++;
   g.visible=true;g.texture=PX.UT[e.type+e.owner];g.position.set(e.x,e.y);g.alpha=.32*(1-k)}}
 for(let i=si;i<PX.spPool.length;i++)PX.spPool[i].visible=false;
 for(let i=gi;i<PX.gPool.length;i++)PX.gPool[i].visible=false}
function _drawScenePx(){
 ctx.clearRect(0,0,W,H);fxWatch();
 const nowT=performance.now();
 if(units.some(u=>u.hp<=0&&u.dieT&&nowT-u.dieT>=500))units=units.filter(u=>!(u.hp<=0&&u.dieT&&nowT-u.dieT>=500));
 const now=performance.now();
 try{pxFrame(now);pxFx(now);_pxFxDrawn=true;PX.app.renderer.render(PX.app.stage)}catch(e){console.warn('Pixi frame error → Canvas',e);_pxFxDrawn=false;pxDisable();return}
 _drawFxAndHover(now)}
function draw(){if(!units)return;   /* قبل از شروع بازی چیزی برای رسم نیست */
 const n=performance.now(),dk=shake*Math.max(0,1-(n-shakeT)/380);ctx.clearRect(0,0,W,H);ctx.save();
 const sx=dk>.3?(Math.random()-.5)*2*dk:0,sy=dk>.3?(Math.random()-.5)*2*dk:0;   /* لرزش دوربین: هم روی Canvas هم Pixi */
 const pz=punchZoom(n);ctx.translate(sx,sy);if(pz!==1){ctx.translate(W/2,H/2);ctx.scale(pz,pz);ctx.translate(-W/2,-H/2)}   /* ضربهٔ زوم دوربین */
 const usePx=!!(PX&&PX.T&&PX.T.obj);if(usePx){PX.world.scale.set(pz);PX.world.position.set(sx+W/2*(1-pz),sy+H/2*(1-pz))}
 try{usePx?_drawScenePx():_drawScene()}finally{ctx.restore()}}
function _drawScene(){_pxFxDrawn=false;ctx.clearRect(0,0,W,H);fxWatch();
 /* فاز ۵: پاک‌سازی واحدهای مرده پس از پایان انیمیشن */
 const nowT=performance.now();
 if(units.some(u=>u.hp<=0&&u.dieT&&nowT-u.dieT>=500))units=units.filter(u=>!(u.hp<=0&&u.dieT&&nowT-u.dieT>=500));
 for(const h of cells){const {x,y}=hexToPixel(h.q,h.r),k=key(h.q,h.r);
  /* OBJ اول رندر می‌شود تا زیر OBSTACLE دفن نشود */
  if(OBJ.includes(k)){tile(x,y,C.violet,C.violet+'40',true);objGlow(x,y,k);
   ctx.fillStyle=C.violet;ctx.beginPath();const d=size*.22;ctx.moveTo(x,y-d);ctx.lineTo(x+d,y);ctx.lineTo(x,y+d);ctx.lineTo(x-d,y);ctx.fill()}
  else if(OBSTACLES.has(k)){tile(x,y,'#5a6276','#1a2030',false);
   ctx.strokeStyle='#8b93a7';ctx.lineWidth=2.5;ctx.lineCap='round';
   const d=size*.3;ctx.beginPath();ctx.moveTo(x-d,y-d);ctx.lineTo(x+d,y+d);ctx.moveTo(x+d,y-d);ctx.lineTo(x-d,y+d);ctx.stroke()}
  else if(REPAIR.has(k)){tile(x,y,C.cyan,C.cyan+'1A',true);
   ctx.fillStyle=C.cyan;ctx.fillRect(x-size*.22,y-size*.05,size*.44,size*.1);ctx.fillRect(x-size*.05,y-size*.22,size*.1,size*.44)}
  else if(S.grid)tile(x,y,C.cyan+'4D');
  else if(moveSet.has(k)||atkSet.has(k)||healSet.has(k))tile(x,y,C.cyan+'1A');
  if(sel&&sel.q===h.q&&sel.r===h.r)tile(x,y,C.amber,C.amber+'33',true);
  {if(moveSet.has(k)||atkSet.has(k)||healSet.has(k))tileScale=popK(h);
   if(moveSet.has(k))tile(x,y,C.cyan,C.cyan+'26',true);
   if(atkSet.has(k))tile(x,y,C.red,C.red+'26',true);if(healSet.has(k))tile(x,y,C.violet,C.violet+'40',true);tileScale=1}}
 const now=performance.now();
 for(const u of units){const dying=u.hp<=0;
  if(dying){if(!u.dieT)continue}
  let p=hexToPixel(u.q,u.r);
  if(u.mv){const k=Math.min(1,(now-u.mv.t)/200),e=k*k*(3-2*k),f=hexToPixel(u.mv.q,u.mv.r);
   p={x:f.x+(p.x-f.x)*e,y:f.y+(p.y-f.y)*e};if(k>=1){u.mv=null;fxLand(p.x,p.y,u)}else fxTrail(p.x,p.y,u,now)}
  const hit=u.hitT&&now-u.hitT<300,tt=now-(u.hitT||0),damp=hit?1-tt/300:0;
  const x=p.x+(hit?Math.sin(tt*.05)*6*damp:0),y=p.y+(hit?Math.cos(tt*.06)*3*damp:0)+((dying||u.mv||u.type==='core'||RM||S.fx===false)?0:Math.sin(now/520+u.q*1.3+u.r*.7)*size*.04);
  ctx.save();
  if(dying){const k=Math.min(1,(now-u.dieT)/400);ctx.globalAlpha=1-k;ctx.translate(x,y);ctx.scale(1+.3*k,1+.3*k);ctx.translate(-x,-y)}
  drawUnit(u,x,y,hit?1-(now-u.hitT)/300:0);ctx.restore();
  if(u===sel&&u.hp>0){const pu=.5+.5*Math.sin(now/250);
   ctx.save();ctx.strokeStyle=C.amber;ctx.lineWidth=2;ctx.globalAlpha=pu;ctx.beginPath();ctx.arc(x,y,size*(.7+.1*pu),0,7);ctx.stroke();ctx.restore()}}
 _drawFxAndHover(now)}
function _drawFxAndHover(now){
 /* فاز ۵: FX — گلوله و اعداد آسیب */
 fx=fx.filter(e=>{if(now<e.t0)return true;const k=(now-e.t0)/e.dur;if(k>=1)return false;
  if(e.k==='banner'||e.k==='conf'){drawFx(e,k,now);return true}
  if(e.k==='spark'||e.k==='ring'||e.k==='ghost'){if(!_pxFxDrawn)drawFx(e,k,now);return true}   /* با Pixi، این‌ها روی GPU کشیده می‌شوند */
  if(e.k==='proj'){const x=e.x1+(e.x2-e.x1)*k,y=e.y1+(e.y2-e.y1)*k,dx=e.x2-e.x1,dy=e.y2-e.y1,L=Math.hypot(dx,dy)||1,tl=Math.min(k*L,size*2.4),tx=x-dx/L*tl,ty=y-dy/L*tl;
   ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';
   const g=ctx.createLinearGradient(tx,ty,x,y);g.addColorStop(0,e.col+'00');g.addColorStop(1,e.col);ctx.strokeStyle=g;
   ctx.globalAlpha=(1-k*.3)*.35;ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(x,y);ctx.stroke();
   ctx.globalAlpha=1-k*.3;ctx.lineWidth=3.5;ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(x,y);ctx.stroke();
   const rg=ctx.createRadialGradient(x,y,0,x,y,9);rg.addColorStop(0,'#ffffff');rg.addColorStop(.35,e.col);rg.addColorStop(1,e.col+'00');
   ctx.fillStyle=rg;ctx.beginPath();ctx.arc(x,y,9,0,7);ctx.fill();ctx.restore()}
  else if(e.k==='dmg'){const pop=k<.18?.6+(k/.18)*.9:1.5-.5*Math.min(1,(k-.18)/.3),yy=e.y-size*.8-_eo(k)*size*.95;
   ctx.save();ctx.globalAlpha=k<.7?1:1-(k-.7)/.3;ctx.translate(e.x,yy);ctx.scale(pop,pop);
   ctx.fillStyle=e.col;ctx.strokeStyle='#000';ctx.lineWidth=3;ctx.font='bold '+Math.round(size*.55)+'px "NC Fa","NC Mi","NC Sans",system-ui';ctx.textAlign='center';
   ctx.strokeText(e.txt,0,0);ctx.fillText(e.txt,0,0);ctx.restore()}
  else if(e.k==='beam'){if(!_pxFxDrawn){ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';const a=Math.sin(k*Math.PI)*.9;
   ctx.strokeStyle=e.col;ctx.globalAlpha=a*.28;ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(e.x1,e.y1);ctx.lineTo(e.x2,e.y2);ctx.stroke();
   ctx.strokeStyle='#ffffff';ctx.globalAlpha=a;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(e.x1,e.y1);ctx.lineTo(e.x2,e.y2);ctx.stroke();ctx.restore()}}
  else if(e.k==='flash'){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=e.a*Math.pow(1-k,2);ctx.fillStyle=e.col;ctx.fillRect(-60,-60,W+120,H+120);ctx.restore()}
  return true});
 /* پیش‌نمایش آسیب */
 if(hover&&atkSet.has(hover)&&sel){const[hq,hr]=hover.split(',').map(Number),t=unitAt(hq,hr);
  if(t){const p=hexToPixel(t.q,t.r),dmg=Math.min(sel.atk,t.hp);
   ctx.fillStyle=C.red;ctx.strokeStyle='#000';ctx.lineWidth=3;ctx.font='bold '+Math.round(size*.55)+'px "NC Fa","NC Mi","NC Sans",system-ui';ctx.textAlign='center';
   ctx.strokeText('-'+dmg,p.x,p.y-size*.8);ctx.fillText('-'+dmg,p.x,p.y-size*.8)}}}
function refresh(){
 if(sel&&sel.hp<=0)sel=null;   /* انتخاب واحد مرده پاک شود */
 const c=turn===1?C.cyan:C.red;$('#pdot').style.cssText='background:'+c+';color:'+c;
 const aiT=aiMode&&turn===2;   /* نوبت AI: فقط «AI · سطح» (بدون «بازیکن ۲») */
 $('#pname').dir=(S.lang==='fa')?'rtl':'ltr';
 $('#pname').textContent=(aiT?tr('aiName')+' · '+tr('lv_'+S.aiLevel):tr('player')+' '+turn)+(onlineMode&&myTurn()?' '+tr('you'):'')+(holdStreak[turn]?' · '+tr('hold')+' '+holdStreak[turn]+'/3':'');
 $('#pname').style.color=c;
 if(introActive){$('#pdot').style.cssText='background:#3a4256;color:#3a4256';$('#pname').textContent='…';$('#pname').style.color='#8b93a7'}   /* قرعه در جریان است */
 $('#ap').innerHTML=[0,1].map(i=>'<i class="'+(i<ap?'on':'')+'"></i>').join('');
 for(const o of[1,2]){const k=units.find(u=>u.owner===o&&u.type==='core');$('#hp'+o).style.width=(100*k.hp/k.maxHp)+'%'}
 {
 const aiLock = aiMode && turn===2;
 const netLock = onlineMode && (
   (onlineMode==='guest' && turn!==2) ||
   (onlineMode==='host'  && turn!==1)
 );
 const lock = aiLock || netLock;
 $('#ctrl').style.pointerEvents = lock?'none':'';
 $('#ctrl').style.opacity = lock?.4:1;
 if(introActive){$('#ctrl').style.pointerEvents='none';$('#ctrl').style.opacity=.6}
}
 document.querySelectorAll('.obj i').forEach((el,i)=>{const x=units.find(u=>u.hp>0&&key(u.q,u.r)===OBJ[i]);el.style.background=x?(x.owner===1?C.cyan:C.red):C.violet;el.style.opacity=x?1:.35});
 document.querySelectorAll('#ctrl [data-m]').forEach(b=>b.classList.toggle('act',b.dataset.m===mode));
 const u=sel;$('#panel').innerHTML=u?
  '<div class="ustat">'+tr('hp')+'<b>'+u.hp+'/'+u.maxHp+'</b></div><div class="ustat">'+tr('atk')+'<b>'+u.atk+'</b></div><div class="ustat">'+tr('range')+'<b>'+u.range+'</b></div><div class="ustat">'+tr('mv')+'<b>'+u.move+'</b></div><div id="uname" style="color:'+(u.owner===1?C.cyan:C.red)+'">'+tr('u_'+u.type)+(u.cooldown?'<small style="display:block;font-size:10px;color:#8b93a7">'+tr('cd')+' '+u.cooldown+'</small>':'')+'</div>'
  :'<div class="ustat" style="width:100%">'+tr('selectUnit')+'</div>';
 draw();}
/* ================= فاز ۵: AI با Sniper kiting ================= */
const AI_DELAY=550,sleep=ms=>new Promise(r=>setTimeout(r,ms));
const AI_ORDER={support:0,sniper:1,archer:2,soldier:3,heavy:4,core:5};
const nearest=(from,list)=>{let b=null,bs=1e9;for(const c of list){const d=dist(from,c);if(d<bs){bs=d;b=c}}return b};
/* ترتیب واحدها هر نوبت چرخشی است: واحدی که نوبت قبل کمتر بازی کرده اول می‌آید (تعادل بین واحدها) */
const aiUnits=(all)=>units.filter(u=>u.owner===2&&u.hp>0&&!(u.type==='sniper'&&S.aiLevel!=='hard'&&(aiActs[u.id]>=1||(!all&&aiLast[u.id]===aiTurnNo-1)))).sort((a,b)=>aiRank?((aiRank[a.id]??99)-(aiRank[b.id]??99)):AI_ORDER[a.type]-AI_ORDER[b.type]);
function aiMakeRank(){aiTurnNo++;aiRank={};aiActs={};
 units.filter(u=>u.owner===2&&u.hp>0).map(u=>[u.id,(u.type==='core'?99:(aiLast[u.id]||0))+Math.random()*.5])
  .sort((a,b)=>a[1]-b[1]).forEach(([id],i)=>aiRank[id]=i)}
const foesOf=o=>units.filter(u=>u.owner!==o&&u.hp>0);
function threatScore(t){let s=t.atk*3+t.hp*0.6;
 if(t.type==='support')s+=4;if(t.type==='sniper')s+=2;if(t.type==='core')s+=40;if(t.hp<=2)s+=6;return s}
function deadliest(list){return list.reduce((a,b)=>threatScore(b)>threatScore(a)?b:a,list[0])}
function threatAt(q,r,owner){let dmg=0;
 for(const f of units){if(f.hp<=0||f.owner===owner||f.atk<=0)continue;
  if(f.type==='heavy'&&f.cooldown>0)continue;
  if(dist(f,{q,r})<=f.range)dmg+=f.atk}
 return dmg}
function computeFocus(foes){if(!foes.length)return null;let best=null,bestSc=-1e9;
 for(const t of foes){const sc=threatScore(t)-t.hp*1.5;if(sc>bestSc){bestSc=sc;best=t}}return best}
function canAIAttack(u){if(!canAttack(u))return false;
 if(u.type==='support'){return units.some(t=>t.hp>0&&t.owner!==u.owner&&dist(u,t)<=u.range&&t.hp<=u.atk)}
 return true}
function myObj(){return OBJ.filter(k=>{const x=units.find(u=>u.hp>0&&key(u.q,u.r)===k);return !x||x.owner!==2})}
function holdAll(){return OBJ.every(k=>{const x=units.find(u=>u.hp>0&&key(u.q,u.r)===k);return x&&x.owner===2})}
function findPath(from,to,maxSteps){const par=new Map([[key(from.q,from.r),null]]);let fr=[{q:from.q,r:from.r}],
 best={q:from.q,r:from.r},bd=dist(from,to);
 for(let st=0;st<maxSteps;st++){const nx=[];
  for(const h of fr)for(const n of neighbors(h.q,h.r)){const k=key(n.q,n.r);
   if(par.has(k)||unitAt(n.q,n.r)||OBSTACLES.has(k))continue;
   par.set(k,h);nx.push(n);const d=dist(n,to);if(d<bd){bd=d;best=n}}
  fr=nx}
 const path=[];let c=best;while(c){path.unshift(c);c=par.get(key(c.q,c.r))}
 return path}
function bestAttackSpot(u,moves,foes){let best=null,bestScore=0;
 for(const k of moves){const[q,r]=k.split(',').map(Number),cand={q,r};
  for(const t of foes){
   if(dist(u,t)<=u.range)continue;
   if(dist(cand,t)>u.range)continue;
   const kill=(t.hp<=u.atk)?15:0;
   const focusBonus=(t===aiFocus)?8:0;
   const danger=threatAt(q,r,2)*1.2;
   const sc=threatScore(t)-dist(cand,t)*0.5+kill+focusBonus-danger;
   if(sc>bestScore){bestScore=sc;best=cand}}}
 return best}
function bestHealSpot(u,moves,wounded){let best=null,bestScore=0;
 for(const k of moves){const[q,r]=k.split(',').map(Number),cand={q,r};
  for(const t of wounded){
   if(dist(u,t)<=u.range)continue;
   if(dist(cand,t)>u.range)continue;
   const sc=(t.maxHp-t.hp)*2+(t.type==='core'?8:0)-dist(cand,t)*0.3-threatAt(q,r,2)*0.6;
   if(sc>bestScore){bestScore=sc;best=cand}}}
 return best}
/* فاز ۵: عقب‌نشینی Sniper — دور از دشمن نزدیک */
function bestKiteSpot(u,moves,foes){
 if(!foes.length)return null;
 let best=null,bestD=0;
 for(const k of moves){const[q,r]=k.split(',').map(Number);
  let minD=1e9;for(const f of foes)minD=Math.min(minD,dist({q,r},f));
  if(minD>bestD){bestD=minD;best={q,r}}}
 return bestD>2?best:null}
/* fallback اسنایپر: نزدیک‌تر به هدف ولی وارد برد دشمن نشو */
function bestSniperFallback(u,moves,target,foes){
 if(!target)return null;
 let best=null,bestScore=-1e9;
 for(const k of moves){const[q,r]=k.split(',').map(Number);
  const dToTarget=dist({q,r},target);
  const safety=foes.length?Math.min(...foes.map(f=>dist({q,r},f))):99;
  const sc=-Math.abs(dToTarget-(u.range-1))*3+safety*2;
  if(sc>bestScore){bestScore=sc;best={q,r}}}
 return best}
function pickAIAction(){
 const us=aiUnits(),foes=foesOf(2),own=units.filter(u=>u.owner===2&&u.hp>0);
 const myCore=own.find(u=>u.type==='core'&&u.hp>0);
 if(!foes.length)return null;
 const allHeld=holdAll();
 if(!aiFocus||aiFocus.hp<=0)aiFocus=computeFocus(foes);
 /* ۱) کشتن فوری */
 for(const u of us){if(u.type==='support')continue;if(!canAIAttack(u))continue;
  const k=foes.filter(t=>dist(u,t)<=u.range&&t.hp<=u.atk);
  if(k.length)return{type:'attack',unit:u,target:deadliest(k)}}
 /* ۱b) heal بحرانی */
 for(const u of us){if(!canHeal(u))continue;
  const w=own.filter(t=>t!==u&&t.hp<t.maxHp&&dist(u,t)<=u.range);
  if(!w.length)continue;
  const core=w.find(t=>t.type==='core');
  const tgt=core||w.reduce((a,b)=>(a.hp/a.maxHp<=b.hp/b.maxHp)?a:b);
  if(core||tgt.hp/tgt.maxHp<0.5)return{type:'heal',unit:u,target:tgt}}
 /* ۲) تاکتیکی */
 for(const u of us){
  if(u.hasMoved){
   if(canAIAttack(u)){const inR=foes.filter(x=>dist(u,x)<=u.range);
    if(inR.length){const kill=inR.filter(x=>x.hp<=u.atk);
     if(kill.length)return{type:'attack',unit:u,target:deadliest(kill)};
     if(aiFocus&&inR.includes(aiFocus))return{type:'attack',unit:u,target:aiFocus};
     return{type:'attack',unit:u,target:deadliest(inR)}}}
   if(u.type==='support'&&canHeal(u)){const w=own.filter(t=>t!==u&&t.hp<t.maxHp&&dist(u,t)<=u.range);
    if(w.length)return{type:'heal',unit:u,target:w.reduce((a,b)=>(a.hp/a.maxHp<=b.hp/b.maxHp)?a:b)}}
   continue}
  if(u.move<1||u.type==='core')continue;
  if(allHeld&&OBJ.includes(key(u.q,u.r)))continue;
  const moves=getMoves(u);if(!moves.size)continue;
  /* Sniper kiting — پیش از منطق عمومی */
  if(u.type==='sniper'){
   const close=foes.filter(f=>dist(u,f)<=2);
   if(close.length){const kite=bestKiteSpot(u,moves,foes);if(kite)return{type:'move',unit:u,dest:kite}}
   if(canAIAttack(u)&&aiFocus&&dist(u,aiFocus)>u.range){
    const spot=bestAttackSpot(u,moves,[aiFocus]);
    if(spot)return{type:'move',unit:u,dest:spot}}
   /* fallback — نزدیک‌تر بشو ولی وارد range نشو */
   const tg=aiFocus||nearest(u,foes);
   const fb=bestSniperFallback(u,moves,tg,foes);
   if(fb)return{type:'move',unit:u,dest:fb};
   continue}
  /* عقب‌نشینی امن */
  if(u.hp<=u.maxHp*0.25&&myCore&&myCore!==u){
   if(foes.some(t=>dist(u,t)<=2)&&dist(u,myCore)>3){
    const path=findPath(u,myCore,12);if(path.length>1)return{type:'move',unit:u,dest:path[1]}}}
  if(u.type==='support'&&canHeal(u)){
   const w=own.filter(t=>t!==u&&t.hp<t.maxHp);
   if(w.length&&!w.some(t=>dist(u,t)<=u.range)){
    const spot=bestHealSpot(u,moves,w);if(spot)return{type:'move',unit:u,dest:spot}}}
  if(canAIAttack(u)){const spot=bestAttackSpot(u,moves,foes);if(spot)return{type:'move',unit:u,dest:spot}}
  if(u.type!=='support'){
   const objs=myObj();
   if(objs.length){const held=3-objs.length;let cObj=null,cD=1e9;
    for(const k of objs){const[oq,orr]=k.split(',').map(Number);
     const d=dist(u,{q:oq,r:orr});if(d<cD){cD=d;cObj={q:oq,r:orr}}}
    const nd=nearest(u,foes),ndD=nd?dist(u,nd):1e9;
    if(cObj&&cD<=6&&(held>=2||cD<=ndD)){
     const path=findPath(u,cObj,12);if(path.length>1)return{type:'move',unit:u,dest:path[1]}}}}}
 /* ۳) حمله / heal از موقعیت فعلی */
 for(const u of us){
  if(canHeal(u)){const w=own.filter(t=>t!==u&&t.hp<t.maxHp&&dist(u,t)<=u.range);
   if(w.length)return{type:'heal',unit:u,target:w.reduce((a,b)=>(a.hp/a.maxHp<=b.hp/b.maxHp)?a:b)}}
  if(canAIAttack(u)){const t=foes.filter(x=>dist(u,x)<=u.range);
   if(t.length){const kill=t.filter(x=>x.hp<=u.atk);
    if(kill.length)return{type:'attack',unit:u,target:deadliest(kill)};
    if(aiFocus&&t.includes(aiFocus))return{type:'attack',unit:u,target:aiFocus};
    return{type:'attack',unit:u,target:deadliest(t)}}}}
 /* ۴) پیشروی */
 for(const u of us){
  if(u.hasMoved||u.move<1||u.type==='core'||u.type==='sniper')continue;
  if(allHeld&&OBJ.includes(key(u.q,u.r)))continue;
  const moves=getMoves(u);if(!moves.size)continue;
  const enemyCore=foes.find(t=>t.type==='core');
  let tg=nearest(u,foes);
  if(enemyCore&&(!tg||dist(u,enemyCore)<dist(u,tg)+2))tg=enemyCore;
  if(!tg||dist(u,tg)<=u.range)continue;
  const path=findPath(u,tg,12);
  if(path.length>1)return{type:'move',unit:u,dest:path[1]}}
 return null}
function aiPerformAction(a){const u=a.unit;aiLast[u.id]=aiTurnNo;aiActs[u.id]=(aiActs[u.id]||0)+1;sel=u;moveSet=new Set();atkSet=new Set();healSet=new Set();
 if(a.type==='move'){u.mv={q:u.q,r:u.r,t:performance.now()};SFX.move();u.q=a.dest.q;u.r=a.dest.r;u.hasMoved=true;ap--}
 else if(a.type==='attack')attack(u,a.target);else heal(u,a.target)}
/* ---- سطح سختی AI: آسان / متوسط / سخت ---- */
const AI_LEVELS={easy:{mistake:.55,quit:.25},medium:{mistake:.2,quit:.08},hard:{mistake:0,quit:0}};
function randomAIAction(lv){
 const us=aiUnits(),foes=foesOf(2),atk=[],oth=[];
 for(const u of us){
  if(canAttack(u))foes.filter(t=>dist(u,t)<=u.range).forEach(t=>atk.push({type:'attack',unit:u,target:t}));
  if(canHeal(u))units.filter(t=>t.owner===2&&t.hp>0&&t!==u&&t.hp<t.maxHp&&dist(u,t)<=u.range).forEach(t=>oth.push({type:'heal',unit:u,target:t}));
  if(!u.hasMoved&&u.move>=1&&u.type!=='core')getMoves(u).forEach(k=>{const[q,r]=k.split(',').map(Number);oth.push({type:'move',unit:u,dest:{q,r}})});
 }
 const pick=a=>a[Math.floor(Math.random()*a.length)];
 if(atk.length&&(lv==='easy'?Math.random()<.4:Math.random()<.6))return pick(atk);
 const all=atk.concat(oth);return all.length?pick(all):null}
function aiChoose(){
 const lv=AI_LEVELS[S.aiLevel]?S.aiLevel:'medium',P=AI_LEVELS[lv];
 if(Math.random()<P.quit)return null;
 if(Math.random()<P.mistake){const r=randomAIAction(lv);if(r)return r}
 const r0=pickAIAction();
 /* اسنایپر در سطح آسان و متوسط ساده‌تر بازی می‌کند */
 if(r0&&r0.unit.type==='sniper'&&lv!=='hard'&&Math.random()<(lv==='easy'?.7:.35)){const r=randomAIAction(lv);if(r)return r}
 return r0}
async function AITurn(){
 if(over||turn!==2||!aiMode)return;const gen=aiGen,ind=$('#ai-think');ind.style.display='block';
 aiFocus=null;aiMakeRank();await sleep(AI_DELAY);
 while(ap>0&&!over&&gen===aiGen){const a=aiChoose();if(!a)break;aiPerformAction(a);refresh();await sleep(AI_DELAY)}
 ind.style.display='none';if(over||gen!==aiGen)return;
 await sleep(AI_DELAY/2);if(gen!==aiGen)return;sel=null;endTurn()}
/* پنجرهٔ مخصوص آنلاین */
function netShow(html,acts){$('#netBody').innerHTML=html;const box=$('#netActions');box.innerHTML='';
 (acts||[]).forEach(([label,fn])=>{const b=document.createElement('button');b.className='btn';b.style.flex='1';b.textContent=label;b.onclick=fn;box.appendChild(b)});
 $('#netModal').style.display='flex'}
const netHide=()=>{$('#netModal').style.display='none'};
const noNet=()=>netShow('<b>'+tr('noNetTitle')+'</b><br>'+tr('noNetMsg'),[[tr('close'),netHide]]);
/* host = Player 1، guest = Player 2 */
const myTurn=()=>onlineMode==='host'?turn===1:onlineMode==='guest'?turn===2:true;

/* ================= NET — Online multiplayer via PeerJS (host authoritative) ================= */
let onlineMode = null; // null | 'host' | 'guest'

const NET = (()=>{
  let peer=null, conn=null, connected=false, isHost=false, roomCode=null;
  const CH='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const genCode=()=>{let s='NC-';for(let i=0;i<5;i++)s+=CH[Math.floor(Math.random()*CH.length)];return s};
  let pc=null;
  function cleanup(){
    try{if(conn)conn.close()}catch(e){}
    try{if(peer)peer.destroy()}catch(e){}
    try{if(pc)pc.close()}catch(e){}
    peer=null;conn=null;pc=null;connected=false;
  }
  /* ---- روش ۲: اتصال دستی (WebRTC بدون سرور؛ کدها با پیام‌رسان رد و بدل می‌شوند) ---- */
  const ICE={iceServers:[{urls:'stun:stun.l.google.com:19302'}]};
  const b64=u8=>{let s='';u8.forEach(b=>s+=String.fromCharCode(b));return btoa(s)};
  const unb64=t=>Uint8Array.from(atob(t),c=>c.charCodeAt(0));
  async function pack(d){
    const j=JSON.stringify({t:d.type,s:d.sdp});
    try{if(window.CompressionStream){
      const cs=new CompressionStream('deflate'),w=cs.writable.getWriter();w.write(new TextEncoder().encode(j));w.close();
      return 'NC2Z'+b64(new Uint8Array(await new Response(cs.readable).arrayBuffer()))}}catch(e){}
    return 'NC2P'+btoa(unescape(encodeURIComponent(j)));
  }
  async function unpack(code){
    const c=(code||'').replace(/\s+/g,'');
    if(c.slice(0,3)!=='NC2')throw new Error('bad code');
    let j;
    if(c[3]==='Z'){
      const ds=new DecompressionStream('deflate'),w=ds.writable.getWriter();w.write(unb64(c.slice(4)));w.close();
      j=await new Response(ds.readable).text();
    }else j=decodeURIComponent(escape(atob(c.slice(4))));
    const o=JSON.parse(j);return {type:o.t,sdp:o.s};
  }
  const waitIce=p=>new Promise(res=>{
    if(p.iceGatheringState==='complete')return res();
    let to;const done=()=>{clearTimeout(to);p.removeEventListener('icegatheringstatechange',chk);res()};
    const chk=()=>{if(p.iceGatheringState==='complete')done()};
    to=setTimeout(done,3500);p.addEventListener('icegatheringstatechange',chk);
  });
  function mkAdapter(dc){
    const h={};
    const c={on(e,f){h[e]=f;if(e==='open'&&dc.readyState==='open')setTimeout(f,0)},
      send(m){dc.send(JSON.stringify(m))},close(){try{dc.close()}catch(e){}}};
    dc.onopen=()=>h.open&&h.open();
    dc.onmessage=e=>{let m;try{m=JSON.parse(e.data)}catch(x){return}h.data&&h.data(m)};
    dc.onclose=()=>h.close&&h.close();
    dc.onerror=e=>h.error&&h.error(e);
    return c;
  }
  async function hostManual(onReady,onOpen,onError){
    isHost=true;cleanup();
    try{
      pc=new RTCPeerConnection(ICE);
      conn=mkAdapter(pc.createDataChannel('nc'));wire(onOpen,onError);
      pc.onconnectionstatechange=()=>{if(pc&&pc.connectionState==='failed'&&!connected)onError&&onError({message:'connection failed'})};
      await pc.setLocalDescription(await pc.createOffer());await waitIce(pc);
      onReady(await pack(pc.localDescription));
    }catch(e){onError&&onError(e)}
  }
  async function acceptAnswer(code){const d=await unpack(code);await pc.setRemoteDescription(d)}
  async function joinManual(code,onAnswer,onOpen,onError){
    isHost=false;cleanup();
    try{
      const offer=await unpack(code);
      pc=new RTCPeerConnection(ICE);
      pc.ondatachannel=e=>{conn=mkAdapter(e.channel);wire(onOpen,onError)};
      pc.onconnectionstatechange=()=>{if(pc&&pc.connectionState==='failed'&&!connected)onError&&onError({message:'connection failed'})};
      await pc.setRemoteDescription(offer);await pc.setLocalDescription(await pc.createAnswer());await waitIce(pc);
      onAnswer(await pack(pc.localDescription));
    }catch(e){onError&&onError(e)}
  }
  function wire(onOpen,onError){
    conn.on('open',()=>{connected=true;onOpen()});
    conn.on('data',d=>{try{handleMsg(d)}catch(e){console.warn('netmsg',e)}});
    conn.on('close',()=>{if(connected){connected=false;netEnd('oppLeft')}});
    conn.on('error',e=>onError&&onError(e));
  }
  function host(onReady,onOpen,onError){
    isHost=true;roomCode=genCode();cleanup();
    peer=new Peer(roomCode,{debug:0});
    peer.on('open',()=>onReady(roomCode));
    peer.on('error',e=>{
      if(e.type==='unavailable-id'){setTimeout(()=>host(onReady,onOpen,onError),200);return}
      onError&&onError(e);
    });
    peer.on('connection',c=>{
      if(conn){c.close();return}
      conn=c;
      wire(onOpen,onError);
    });
  }
  function join(code,onOpen,onError){
    isHost=false;roomCode=(code||'').trim().toUpperCase();cleanup();
    peer=new Peer({debug:0});
    peer.on('open',()=>{
      conn=peer.connect(roomCode,{reliable:true});
      wire(onOpen,onError);
    });
    peer.on('error',e=>onError&&onError(e));
  }
  function send(msg){if(conn&&connected){try{conn.send(msg)}catch(e){console.warn(e)}}}
  return {
    host,join,send,cleanup,hostManual,acceptAnswer,joinManual,
    get isHost(){return isHost},
    get connected(){return connected},
    get roomCode(){return roomCode}
  };
})();

/* ---------- Snapshot / Sync ---------- */
function snapshot(){
  return {
    units: units.map(u=>({id:u.id,owner:u.owner,type:u.type,hp:u.hp,maxHp:u.maxHp,
      atk:u.atk,range:u.range,move:u.move,hasMoved:u.hasMoved,hasAttacked:u.hasAttacked,
      cooldown:u.cooldown,q:u.q,r:u.r})),
    turn, ap, holdStreak:{...holdStreak}, over, tl:Math.max(0,Math.round((turnEnd-performance.now())/1000)), to:{...timeouts}
  };
}
function applySnapshot(s){
  /* مهمان فقط وضعیت را می‌گیرد؛ انیمیشن‌ها را با مقایسه‌ی وضعیت قبلی و جدید می‌سازد */
  const now=performance.now(),old=new Map((units||[]).map(u=>[u.id,u]));
  const nu=s.units.map(u=>({...u})),attackers=[],hurt=[];
  nu.forEach(u=>{const o=old.get(u.id);if(!o)return;
    const same=o.q===u.q&&o.r===u.r;
    if(!same)u.mv={q:o.q,r:o.r,t:now};else if(o.mv)u.mv=o.mv;
    if(o.hitT)u.hitT=o.hitT;if(o.dieT)u.dieT=o.dieT;
    const p=hexToPixel(u.q,u.r);
    if(u.hp<o.hp){u.hitT=now;if(u.hp<=0)u.dieT=now;hurt.push(u);
      fx.push({k:'dmg',x:p.x,y:p.y,txt:'-'+(o.hp-u.hp),t0:now,col:C.red,dur:750})}
    else if(u.hp>o.hp&&u.hp>0){fx.push({k:'dmg',x:p.x,y:p.y,txt:'+'+(u.hp-o.hp),t0:now,col:C.cyan,dur:750});fxHeal(p.x,p.y)}
    if(u.hasAttacked&&!o.hasAttacked)attackers.push(u)});
  if(hurt.length)vib(hurt.some(h=>h.hp<=0)?[40,30,90]:30);   /* مهمان: لرزش با دریافت وضعیت */
  hurt.forEach(t=>{const a=attackers.find(x=>x.owner!==t.owner&&dist(x,t)<=x.range)||attackers.find(x=>x.owner!==t.owner);
    if(a){const A=hexToPixel(a.q,a.r),B=hexToPixel(t.q,t.r);
      fx.push({k:'proj',x1:A.x,y1:A.y,x2:B.x,y2:B.y,t0:now,col:a.owner===1?C.cyan:C.red,dur:a.type==='sniper'?300:180});
      const ac=a.owner===1?C.cyan:C.red;fxMuzzle(A.x,A.y,ac);fxImpact(B.x,B.y,ac,t.hp<=0,t.type==='core',a.type==='sniper'||a.type==='heavy',a.type==='sniper'?300:180)}
    else{const B=hexToPixel(t.q,t.r);fxImpact(B.x,B.y,C.red,t.hp<=0,t.type==='core',false,0)}});
  old.forEach(o=>{if(!nu.some(u=>u.id===o.id)&&o.hp>0)nu.push({...o,hp:0,hitT:now,dieT:now,mv:null})});
  units=nu;if(s.tl!=null)turnEnd=performance.now()+s.tl*1000;if(s.to)timeouts={...s.to};
  turn=s.turn;ap=s.ap;holdStreak={...s.holdStreak};over=s.over;
  sel=null;moveSet=new Set();atkSet=new Set();healSet=new Set();
  refresh();
}
function broadcastState(){ if(onlineMode==='host') NET.send({t:'state',s:snapshot()}); }

/* تایمر نوبت (آنلاین): میزبان مرجع است و وقتی زمان تمام شود نوبت را خودکار تمام می‌کند */
setInterval(()=>{
  const el=$('#tmr');if(!el)return;
  const on=onlineMode&&!over&&$('#game').classList.contains('on');
  el.style.display=on?'block':'none';
  if(!on){_lastBeep=-1;return}
  const ms=turnEnd-performance.now(),left=Math.max(0,Math.ceil(ms/1000));
  $('#tmrN').textContent='⏱ '+left;el.classList.toggle('low',left<=5);
  const heart=(p,col)=>{let h='';for(let i=0;i<MAX_TIMEOUTS;i++)h+=i<MAX_TIMEOUTS-timeouts[p]?'♥':'♡';return '<span class="lv" style="color:'+col+'">'+h+'</span>'};
  $('#lv1').innerHTML=heart(1,C.cyan);$('#lv2').innerHTML=heart(2,C.red);
  const y=document.getElementById('bEndYes');if(y&&!myTurn())$('#modal').classList.remove('on');
  if(onlineMode==='host'&&ms<=0){
    /* هر بار زمان نوبت تمام شود یک قلب از بازیکن کم می‌شود (حتی اگر در آن نوبت کاری کرده باشد) و هیچ‌وقت برنمی‌گردد */
    timeouts[turn]++;
    if(timeouts[turn]>=MAX_TIMEOUTS){over=true;refresh();broadcastState();gameOver(turn===1?2:1,'time');return}
    _auto=true;try{endTurn()}finally{_auto=false}return}
  if(myTurn()&&left>0&&left<=3&&left!==_lastBeep){_lastBeep=left;try{left<=1?SFX.warn():SFX.tick()}catch(e){}}
},250);
function updateNetStatus(){
  const el=$('#netStatus'); if(!el) return;
  if(!onlineMode){el.textContent='';return}
  const role=NET.isHost?'HOST':'GUEST';
  const ok=NET.connected?'🟢':'🔴';
  el.textContent=ok+' '+role+(NET.roomCode?' · '+NET.roomCode:'');
}
const netReset=()=>{NET.cleanup();onlineMode=null;updateNetStatus()};

/* ---------- Host: apply guest action ---------- */
function applyGuestAction(msg){
  if(over) return;
  if(msg.kind==='move'){
    if(turn!==2||ap<1) return;
    const u=units.find(x=>x.id===msg.unitId);
    if(!u||u.hp<=0||u.owner!==2||u.hasMoved) return;
    if(!getMoves(u).has(key(msg.q,msg.r))) return;
    u.mv={q:u.q,r:u.r,t:performance.now()};
    SFX.move();u.q=msg.q;u.r=msg.r;u.hasMoved=true;ap--;
    refresh();
  } else if(msg.kind==='attack'){
    if(turn!==2||ap<1) return;
    const u=units.find(x=>x.id===msg.unitId);
    const t=units.find(x=>x.id===msg.targetId);
    if(!u||!t||u.hp<=0||t.hp<=0||u.owner!==2||t.owner===2||!canAttack(u)) return;
    if(dist(u,t)>u.range) return;
    attack(u,t);refresh();
  } else if(msg.kind==='heal'){
    if(turn!==2||ap<1) return;
    const u=units.find(x=>x.id===msg.unitId);
    const t=units.find(x=>x.id===msg.targetId);
    if(!u||!t||u.hp<=0||t.hp<=0||u.owner!==2||t.owner!==2||!canHeal(u)) return;
    if(dist(u,t)>u.range||t.hp>=t.maxHp) return;
    heal(u,t);refresh();
  } else if(msg.kind==='endTurn'){
    if(turn!==2) return;
    endTurn();
  }
}

/* ---------- Message handler ---------- */
function handleMsg(msg){
  if(msg.t==='hello'){
    if(NET.isHost){
      const first=Math.random()<.5?1:2;   /* میزبان قرعه را می‌اندازد */
      NET.send({t:'start',first,map:S.map||'classic'});
      $('#netModal').style.display='none';
      onlineMode='host';
      newGame(false,first,S.map);
      show('game');
      updateNetStatus();
      broadcastState();   /* همگام‌سازی اولیه با مهمان */
    }
  } else if(msg.t==='rematch'){
    rmTheirs=true;setRmStatus();if(rmMine&&NET.isHost)hostStartRematch();
  } else if(msg.t==='start'){
    if(!NET.isHost){
      $('#netModal').style.display='none';$('#modal').classList.remove('on');
      onlineMode='guest';
      newGame(false,msg.first,msg.map||'classic');
      show('game');
      updateNetStatus();
    }
  } else if(msg.t==='sfx'){
    if(!NET.isHost){window._rx=(window._rx||0)+1;if(SFX._o[msg.n])SFX._o[msg.n]()}
  } else if(msg.t==='state'){
    if(!NET.isHost&&!over) applySnapshot(msg.s);
  } else if(msg.t==='action'){
    if(NET.isHost){ applyGuestAction(msg); broadcastState(); }
  } else if(msg.t==='over'){
    if(!NET.isHost){over=true;gameOver(msg.w,msg.why)}
  } else if(msg.t==='bye'){
    netEnd('oppLeft');
  }
}

function netEnd(reason){
  if(!onlineMode) return;
  if(over){   /* بازی تمام شده: پیام برد را با «اتصال قطع شد» جایگزین نکن */
    NET.cleanup();onlineMode=null;updateNetStatus();
    const b=$('#bAgain');if(b){b.disabled=true;b.style.opacity=.4}
    const st=$('#rmStatus');if(st)st.textContent=tr(reason);
    return;
  }
  over=true;stopAmbient();
  onlineMode=null;
  updateNetStatus();
  modal('<b style="color:var(--signal-red)">'+tr('connLost')+'</b><br>'+tr(reason));
}

/* ---------- Modals ---------- */
const netTabs=cur=>`<div style="display:flex;gap:8px;margin:10px 0 6px">
  <button class="btn ntab ${cur===1?'on':''}" data-m="1" style="flex:1;padding:8px 4px;font-size:13px;line-height:1.4">${tr('m1')}<br><small>${tr('m1s')}</small></button>
  <button class="btn ntab ${cur===2?'on':''}" data-m="2" style="flex:1;padding:8px 4px;font-size:13px;line-height:1.4;border-color:var(--amber-core)">${tr('m2')}<br><small>${tr('m2s')}</small></button></div>`;
const hasRTC=()=>typeof RTCPeerConnection!=='undefined';
function copyEl(el,st){
  try{el.focus();el.select();el.setSelectionRange(0,99999)}catch(e){}
  let ok=false;try{ok=document.execCommand('copy')}catch(e){}
  if(!ok&&navigator.clipboard){try{navigator.clipboard.writeText(el.value);ok=true}catch(e){}}
  if(ok&&st)st.textContent=tr('mCopied');
}
async function pasteInto(el){try{el.value=await navigator.clipboard.readText()}catch(e){el.focus()}}
function leaveNet(){NET.cleanup();onlineMode=null;$('#netModal').style.display='none';updateNetStatus()}

function renderHost(method){
  NET.cleanup();onlineMode=null;
  let html=`<b>${tr('hostTitle')}</b>${netTabs(method)}`;
  if(method===1){
    html+=`${tr('hostShare')}<br><br>
    <div id="roomCodeBig" style="font-size:30px;letter-spacing:6px;color:var(--amber-core);text-align:center;padding:18px;background:#000;border-radius:12px;font-weight:800">········</div>
    <div id="hostStatus" style="text-align:center;color:#8b93a7;margin-top:14px;font-size:12px">${tr('hostGen')}</div>`;
    $('#netActions').innerHTML=`<button class="btn" id="bCopyCode" style="flex:1">${tr('copy')}</button>
      <button class="btn" id="bCancelHost" style="flex:1;border-color:var(--signal-red)">${tr('cancel')}</button>`;
  }else{
    html+=`<div style="font-size:12px;color:#8b93a7">${tr('mNote')}</div>
    <div class="mstep">${tr('mH1')}</div><textarea id="mOut" class="mta" readonly></textarea>
    <div class="mrow"><button class="btn" id="mCopy">${tr('copyCode')}</button></div>
    <div class="mstep">${tr('mH2')}</div><textarea id="mIn" class="mta"></textarea>
    <div class="mrow"><button class="btn" id="mPaste">${tr('paste')}</button><button class="btn" id="mGo" style="border-color:var(--amber-core)">${tr('connect')}</button></div>
    <div id="mStatus" style="text-align:center;color:#8b93a7;margin-top:10px;font-size:12px">${tr('mMaking')}</div>`;
    $('#netActions').innerHTML=`<button class="btn" id="bCancelHost" style="flex:1;border-color:var(--signal-red)">${tr('cancel')}</button>`;
  }
  $('#netBody').innerHTML=html;$('#netModal').style.display='flex';
  document.querySelectorAll('#netBody .ntab').forEach(b=>b.onclick=()=>renderHost(+b.dataset.m));
  $('#bCancelHost').onclick=leaveNet;
  if(method===1){
    if(typeof Peer==='undefined'){$('#hostStatus').textContent=tr('noNetMsg');return}
    onlineMode='host';
    NET.host(
      code=>{const el=document.getElementById('roomCodeBig');if(el)el.textContent=code;
        const st=document.getElementById('hostStatus');if(st)st.textContent=tr('hostWait')},
      ()=>{},
      err=>{const st=document.getElementById('hostStatus');if(st)st.textContent=tr('err')+(err.message||err.type)});
    $('#bCopyCode').onclick=()=>{if(NET.roomCode&&navigator.clipboard)navigator.clipboard.writeText(NET.roomCode)};
  }else{
    const st=$('#mStatus'),out=$('#mOut'),inp=$('#mIn');
    if(!hasRTC()){st.textContent=tr('mNoJs');return}
    onlineMode='host';
    NET.hostManual(code=>{out.value=code;st.textContent=tr('mReady')},()=>{},
      err=>{st.textContent=tr('err')+(err.message||err.type||'')});
    $('#mCopy').onclick=()=>copyEl(out,st);
    $('#mPaste').onclick=()=>pasteInto(inp);
    $('#mGo').onclick=async()=>{st.textContent=tr('connecting');
      try{await NET.acceptAnswer(inp.value)}catch(e){st.textContent=tr('mBad')}};
  }
}
function renderJoin(method){
  NET.cleanup();onlineMode=null;
  let html=`<b>${tr('joinTitle')}</b>${netTabs(method)}`;
  if(method===1){
    html+=`${tr('joinPaste')}<br><br>
    <input id="joinCodeInput" placeholder="NC-XXXXX" autocomplete="off"
      style="width:100%;box-sizing:border-box;padding:16px;font-size:22px;letter-spacing:4px;text-align:center;background:#000;border:2px solid var(--amber-core);border-radius:12px;color:var(--amber-core);font-weight:800;text-transform:uppercase;outline:none">
    <div id="joinStatus" style="text-align:center;color:#8b93a7;margin-top:14px;font-size:12px"></div>`;
    $('#netActions').innerHTML=`<button class="btn" id="bDoJoin" style="flex:1;border-color:var(--amber-core)">${tr('connect')}</button>
      <button class="btn" id="bCancelJoin" style="flex:1;border-color:var(--signal-red)">${tr('cancel')}</button>`;
  }else{
    html+=`<div style="font-size:12px;color:#8b93a7">${tr('mNote')}</div>
    <div class="mstep">${tr('mJ1')}</div><textarea id="mIn" class="mta"></textarea>
    <div class="mrow"><button class="btn" id="mPaste">${tr('paste')}</button><button class="btn" id="mMake" style="border-color:var(--amber-core)">${tr('makeReply')}</button></div>
    <div class="mstep">${tr('mJ2')}</div><textarea id="mOut" class="mta" readonly></textarea>
    <div class="mrow"><button class="btn" id="mCopy">${tr('copyCode')}</button></div>
    <div id="mStatus" style="text-align:center;color:#8b93a7;margin-top:10px;font-size:12px"></div>`;
    $('#netActions').innerHTML=`<button class="btn" id="bCancelJoin" style="flex:1;border-color:var(--signal-red)">${tr('cancel')}</button>`;
  }
  $('#netBody').innerHTML=html;$('#netModal').style.display='flex';
  document.querySelectorAll('#netBody .ntab').forEach(b=>b.onclick=()=>renderJoin(+b.dataset.m));
  $('#bCancelJoin').onclick=leaveNet;
  if(method===1){
    const doJoin=()=>{
      if(typeof Peer==='undefined'){$('#joinStatus').textContent=tr('noNetMsg');return}
      const code=($('#joinCodeInput').value||'').trim().toUpperCase();
      if(!code){$('#joinStatus').textContent=tr('enterCode');return}
      onlineMode='guest';$('#joinStatus').textContent=tr('connecting');
      NET.join(code,()=>{NET.send({t:'hello'})},
        err=>{$('#joinStatus').textContent=tr('err')+(err.message||err.type);onlineMode=null});
    };
    $('#bDoJoin').onclick=doJoin;
    $('#joinCodeInput').addEventListener('keydown',e=>{if(e.key==='Enter')doJoin()});
  }else{
    const st=$('#mStatus'),out=$('#mOut'),inp=$('#mIn');
    $('#mCopy').onclick=()=>copyEl(out,st);
    $('#mPaste').onclick=()=>pasteInto(inp);
    $('#mMake').onclick=()=>{
      if(!hasRTC()){st.textContent=tr('mNoJs');return}
      if(!inp.value.trim()){st.textContent=tr('enterCode');return}
      onlineMode='guest';st.textContent=tr('mMaking');out.value='';
      NET.joinManual(inp.value,code=>{out.value=code;st.textContent=tr('mJReady')},()=>{NET.send({t:'hello'})},
        err=>{st.textContent=(err&&err.message==='bad code'||err&&err.name==='SyntaxError')?tr('mBad'):tr('err')+(err.message||err.type||'');onlineMode=null});
    };
  }
}
const openHostModal=()=>renderHost(1);
const openJoinModal=()=>renderJoin(1);
/* END TURN: guest اکشن را به host می‌فرستد، host مستقیم اجرا و همگام می‌کند */
function localEnd(){if(!myTurn()||(aiMode&&turn===2))return;
 if(onlineMode==='guest'){NET.send({t:'action',kind:'endTurn'});return}
 endTurn();broadcastState()}
/* ---------- تعامل لمسی ---------- */
cv.addEventListener('pointermove',e=>{const b=cv.getBoundingClientRect(),h=pixelToHex(e.clientX-b.left,e.clientY-b.top);hover=key(h.q,h.r)});
cv.addEventListener('pointerleave',()=>hover=null);
cv.addEventListener('pointerdown',e=>{
 const b=cv.getBoundingClientRect(),h=pixelToHex(e.clientX-b.left,e.clientY-b.top),k=key(h.q,h.r);
 if(over||introActive||!cellSet.has(k))return;
 if(typeof TUT!=='undefined'&&TUT.on&&!tutCell(k))return;
 if(aiMode&&turn===2)return;
 // online: فقط نوبت خودت
 if(onlineMode==='guest'&&turn!==2)return;
 if(onlineMode==='host'&&turn!==1)return;
 const t=unitAt(h.q,h.r);

 // GUEST: فقط intent می‌فرستد
 if(onlineMode==='guest'){
   if(moveSet.has(k)&&sel){
     NET.send({t:'action',kind:'move',unitId:sel.id,q:h.q,r:h.r});return}
   if(atkSet.has(k)&&t){
     NET.send({t:'action',kind:'attack',unitId:sel.id,targetId:t.id});return}
   if(healSet.has(k)&&t){
     NET.send({t:'action',kind:'heal',unitId:sel.id,targetId:t.id});return}
   if(t&&t.owner===2)select(t);else select(null);
   refresh();return;
 }

 // LOCAL یا HOST: اعمال مستقیم (attack/heal خودشان broadcast می‌کنند)
 if(moveSet.has(k)&&sel){sel.mv={q:sel.q,r:sel.r,t:performance.now()};SFX.move();
   sel.q=h.q;sel.r=h.r;sel.hasMoved=true;ap--;select(sel);refresh();broadcastState();return}
 if(atkSet.has(k)&&t){attack(sel,t);if(!over)select(sel);refresh();return}
 if(healSet.has(k)&&t){heal(sel,t);select(sel);refresh();return}
 if(t&&t.owner===turn)select(t);
 else if(t){sel=t;moveSet=new Set();atkSet=new Set();healSet=new Set()}
 else select(null);
 refresh();
});
document.querySelectorAll('#ctrl [data-m]').forEach(b=>b.onclick=()=>{if(typeof TUT!=='undefined'&&TUT.on&&!tutMode(b.dataset.m))return;mode=b.dataset.m;select(sel);refresh()});
const doEnd=()=>{
  if(onlineMode==='guest'){ NET.send({t:'action',kind:'endTurn'}); return }
  endTurn(); // broadcast داخل خودش هست
};
$('#bEnd').onclick=()=>{
  if(over)return;
  if(typeof TUT!=='undefined'&&TUT.on&&!tutEnd())return;
  /* تأیید پایان نوبت وقتی AP باقی مانده (در تنظیمات قابل خاموش‌کردن) */
  if(S.confirmEnd!==false&&ap>0&&myTurn()&&!(aiMode&&turn===2)&&!(typeof TUT!=='undefined'&&TUT.on)){
    modal('<b>'+tr('endAsk1')+ap+tr('endAsk2')+'</b><br><br><button class="btn" id="bEndYes" style="width:100%;border-color:var(--signal-red);color:var(--signal-red)">'+tr('yesEnd')+'</button>');
    $('#bEndYes').onclick=()=>{$('#modal').classList.remove('on');if(!over&&myTurn())doEnd()};
    return}
  doEnd();
};
const show=id=>{if(id!=='game'&&typeof TUT!=='undefined'&&TUT.on)tutStop();document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id));if(id==='game')requestAnimationFrame(resize);else{_introT.forEach(clearTimeout);introActive=false;const o=$('#firstOv');if(o)o.classList.remove('on')}};
function mapLabel(){const e=$('#mapLbl');if(e)e.textContent=tr('map_'+(S.map||'classic'))}
/* ---------- انتخاب نقشه قبل از شروع بازی (v1.9.5) ---------- */
function mapSvg(id){const m=MAPS[id],sz=9,w=Math.sqrt(3)*sz,W=w*8.5+2,H=sz*12.5+2,set=a=>new Set(a.map(x=>x[0]+','+x[1])),ob=set(m.obs),rp=set(m.rep),oj=set(m.obj);
 let o='<svg viewBox="0 0 '+W.toFixed(1)+' '+H.toFixed(1)+'" style="width:100%;display:block">';
 for(let r=0;r<8;r++)for(let c=0;c<8;c++){const x=1+w*(c+.5*(r&1)+.5),y=1+sz+r*1.5*sz,k=c+','+r;let f='#111826',st='#1c6e80';
  if(ob.has(k)){f='#4a5163';st='#8b93a7'}else if(rp.has(k)){f='#0b5560';st='#00E5FF'}else if(oj.has(k)){f='#4a2478';st='#A855F7'}
  else if(c===0&&r===7){f='#006c7a';st='#00E5FF'}else if(c===7&&r===0){f='#7a1a2c';st='#FF3B5C'}
  let pts='';for(let a=0;a<6;a++){const t=(-90+60*a)*Math.PI/180;pts+=(x+sz*.93*Math.cos(t)).toFixed(1)+','+(y+sz*.93*Math.sin(t)).toFixed(1)+' '}
  o+='<polygon points="'+pts+'" fill="'+f+'" stroke="'+st+'" stroke-width="1"/>'}
 return o+'</svg>'}
function pickMap(cb){const cur=S.map||'classic';
 modal('<b>🗺 '+tr('mapTitle')+'</b><div class="mapRow">'+MAP_IDS.map(id=>{const m=MAPS[id];
  return '<button class="mapCard'+(id===cur?' cur':'')+'" data-id="'+id+'">'+mapSvg(id)+'<div class="mc-n">'+tr('map_'+id)+'</div><small>'+(m.obs.length+' '+tr('mapObs')+' · '+m.rep.length+' '+tr('mapRep'))+'</small></button>'}).join('')
  +'</div>');
 document.querySelectorAll('#mtxt .mapCard').forEach(b=>b.onclick=()=>{S.map=b.dataset.id;syncSet();$('#modal').classList.remove('on');cb()});}
$('#bLocal').onclick=()=>pickMap(()=>{ NET.cleanup();onlineMode=null;updateNetStatus(); show('game');newGame(false) });
const startAI=lv=>{S.aiLevel=lv;syncSet();pickMap(()=>{NET.cleanup();onlineMode=null;updateNetStatus();show('game');newGame(true)})};
$('#bAI').onclick=()=>{
  const col={easy:'var(--neon-cyan)',medium:'var(--amber-core)',hard:'var(--signal-red)'};
  modal('<b>'+tr('aiLvTitle')+'</b>'+['easy','medium','hard'].map(l=>'<button class="btn" data-lv="'+l+'" style="width:100%;margin-top:12px;border-color:'+col[l]+';color:'+col[l]+(S.aiLevel===l?';box-shadow:0 0 12px '+col[l]+' inset':'')+'">'+(S.aiLevel===l?'✓ ':'')+tr('lv_'+l)+'<br><small style="font-weight:400;opacity:.8;color:var(--hull-silver)">'+tr('lvd_'+l)+'</small></button>').join(''));
  document.querySelectorAll('#mtxt [data-lv]').forEach(b=>b.onclick=()=>startAI(b.dataset.lv));
};
$('#bHost').onclick =()=>pickMap(openHostModal);
$('#bJoin').onclick =openJoinModal;
const modal=t=>{$('#modal').style.background='';const _m=$('#mtxt');_m.style.transition='none';_m.style.transform='';_m.innerHTML=t;_m.scrollTop=0;$('#modal').classList.remove('wide','scr');$('#modal').classList.add('on')};
/* v1.8.1 — کشش لاستیکی هنگام اسکرول در پنجره‌های تنظیمات و راهنما */
(function(){const mt=document.getElementById('mtxt'),md=document.getElementById('modal'),CAP=150;
let y0=0,raw=0,on=false;
const act=()=>md.classList.contains('scr')||md.classList.contains('wide');
const res=r=>{const a=Math.abs(r);return Math.sign(r)*CAP*a/(a+CAP*2)};
mt.addEventListener('touchstart',e=>{if(!act()||e.touches.length!==1)return;y0=e.touches[0].clientY;raw=0;on=true;mt.style.transition='none'},{passive:true});
mt.addEventListener('touchmove',e=>{if(!on||!act())return;const y=e.touches[0].clientY,d=y-y0;y0=y;
 const top=mt.scrollTop<=0,bot=mt.scrollTop+mt.clientHeight>=mt.scrollHeight-1;
 if(raw===0&&!((top&&d>0)||(bot&&d<0)))return;
 let n=raw+d;if((raw>0&&n<0)||(raw<0&&n>0))n=0;raw=n;
 if(e.cancelable)e.preventDefault();
 mt.style.transform=raw?'translateY('+res(raw).toFixed(1)+'px)':''},{passive:false});
const end=()=>{if(!on)return;on=false;if(raw){mt.style.transition='transform .6s cubic-bezier(.22,1.45,.36,1)';mt.style.transform=''}raw=0};
mt.addEventListener('touchend',end,{passive:true});mt.addEventListener('touchcancel',end,{passive:true});
})();
$('#bHow').onclick=()=>{modal('<button class="btn" id="bTutHow" style="display:block;width:100%;margin:0 0 14px;border-color:var(--amber-core);color:var(--amber-core)">🎓 &nbsp;'+tr('tut')+'</button>'+tr('how'));$('#modal').classList.add('wide');$('#mtxt').scrollTop=0;const tb=$('#bTutHow');if(tb)tb.onclick=()=>startTutorial()};
/* ===== v1.8.3 — اتصال حساب گوگل (پل اندروید: window.NeonAuth ↔ window.NCAuth) ===== */
const NCA={st:{signedIn:false},busy:false,err:null};
const ncBridge=()=>{try{return(window.NeonAuth&&typeof window.NeonAuth.connectGoogle==='function')?window.NeonAuth:null}catch(e){return null}};
const ncGIcon='<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>';
const NC_ERR={offline:'gErrOffline',cancelled:'gErrCancel',no_account:'gErrNoAcc',unavailable:'gErrUnavail',failed:'gErrFail',no_app:'gErrApp'};
function ncAuthHtml(){return '<div class="sg">'+tr('gAccTitle')+'</div><div class="gacc" id="gAcc"><button class="gbtn" id="tGoogle">'+ncGIcon+'<span id="gTxt"></span></button><div class="gst" id="gSt"></div></div>'}
function ncAuthRender(){
 const b=$('#tGoogle'),t=$('#gTxt'),s=$('#gSt');if(!b||!t||!s)return;
 t.textContent=NCA.busy?tr('gConnecting'):tr('gConnect');b.disabled=!!NCA.busy;
 s.textContent='';
 const add=(c,x)=>{const d=document.createElement('div');d.className=c;d.textContent=x;s.appendChild(d)};
 if(NCA.err&&!NCA.busy)add('gs1 e',tr(NC_ERR[NCA.err]||'gErrFail'));
 if(NCA.st&&NCA.st.signedIn){add('gs1 ok','✔ '+tr('gOk'));if(NCA.st.name)add('gs2',NCA.st.name);if(NCA.st.email)add('gs3',NCA.st.email)}
 else if(!NCA.err||NCA.busy)add('gs1',tr('gNone'));
}
window.NCAuth={onEvent:function(p){try{
 if(!p||typeof p!=='object')return;
 const us=()=>p.signedIn?{signedIn:true,uid:String(p.uid||''),email:String(p.email||''),name:String(p.name||'')}:{signedIn:false};
 if(p.kind==='state'){NCA.st=us()}
 else if(p.kind==='signin'){NCA.busy=false;if(p.ok){NCA.err=null;NCA.st=us()}else NCA.err=String(p.error||'failed')}
 ncAuthRender()}catch(e){}}};
function ncAuthBind(){
 const b=$('#tGoogle');if(!b)return;
 NCA.err=null;ncAuthRender();
 b.onclick=()=>{vib(8);const br=ncBridge();
  if(!br){NCA.err='no_app';ncAuthRender();return}
  if(NCA.busy)return;
  NCA.busy=true;NCA.err=null;ncAuthRender();
  try{br.connectGoogle()}catch(e){NCA.busy=false;NCA.err='failed';ncAuthRender()}};
 const br=ncBridge();if(br){try{br.getAuthState()}catch(e){}}
}
function openSettings(){const row=(k,id)=>'<div class="sr"><span>'+tr(k)+'</span><button class="tg" id="'+id+'"></button></div>';
 modal('<div class="sh">⚙ '+tr('setTitle')+'</div>'
  +'<div class="sg">'+tr('setAudio')+'</div>'+row('sound','tSound')+row('music','tMusic')
  +'<div class="sg">'+tr('setDisplay')+'</div>'+row('grid','tGrid')+row('fxOpt','tFx')+row('fpsOpt','tFps')+(pxSupported()?'<div class="sr"><span>'+tr('gfxOpt')+'</span><div class="sel" id="tGfx"><button class="ar" id="gL" aria-label="prev"><svg viewBox="0 0 10 10"><path d="M6.5 1.5 3 5l3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg></button><span id="gV"></span><button class="ar" id="gR" aria-label="next"><svg viewBox="0 0 10 10"><path d="M3.5 1.5 7 5 3.5 8.5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div></div>':'')
  +'<div class="sg">'+tr('setGame')+'</div>'+row('confirmEnd','tConfirm')+(navigator.vibrate?row('vib','tVib'):'')+(fsOK?row('fs','tFs'):'')+row('language','tLang')
+'<div class="sr"><span>'+tr('support')+'</span><button class="tg" id="tSupport">'+tr('supportBtn')+'</button></div>'+ncAuthHtml());
 $('#modal').classList.add('scr');$('#modal').style.background='#0B0F1A';syncSet();
 $('#tSound').onclick=()=>{S.sound=!S.sound;syncSet()};$('#tMusic').onclick=()=>{S.music=!S.music;syncSet();if(!S.music)stopMusic();else if($('#game').classList.contains('on')&&!over)startMusic()};$('#tGrid').onclick=()=>{S.grid=!S.grid;syncSet()};$('#tFx').onclick=()=>{S.fx=(S.fx===false);syncSet()};{const tv=$('#tVib');if(tv)tv.onclick=()=>{S.vib=(S.vib===false);syncSet();vib(40)}}
 {const tf=$('#tFs');if(tf)tf.onclick=()=>{S.fs=(S.fs===false);syncSet();if(S.fs===false){try{const r=(document.exitFullscreen||document.webkitExitFullscreen).call(document);if(r&&r.catch)r.catch(()=>{})}catch(e){}}else tryFS()}}
 {const tp=$('#tFps');if(tp)tp.onclick=()=>{S.fps=(S.fps===false);syncSet()}}
 {const GFX=['pixi','canvas'],step=d=>{const i=GFX.indexOf(S.gfx==='canvas'?'canvas':'pixi');S.gfx=GFX[(i+d+GFX.length)%GFX.length];syncSet();if(S.gfx==='canvas')pxDisable();else{_q=0;_qBad=0;_qGood=0;_qRec=0;pxInit();resize()}vib(8)},l=$('#gL'),r=$('#gR');if(l)l.onclick=()=>step(-1);if(r)r.onclick=()=>step(1)}$('#tConfirm').onclick=()=>{S.confirmEnd=(S.confirmEnd===false);syncSet()};
$('#tLang').onclick=()=>{S.lang=S.lang==='fa'?'en':'fa';syncSet();applyLang();openSettings();if(units)refresh()};
$('#tSupport').onclick=()=>{vib(8);const u='https://rubika.ir/NEONCOMMAND';try{const w=window.open(u,'_blank');if(!w)location.href=u}catch(e){location.href=u}};ncAuthBind();
}
$('#bSet').onclick=openSettings;
document.querySelectorAll('.mute').forEach(m=>m.onclick=()=>setSound(!(S.sound||S.music)));syncSet();applyLang();
$('#bClose').onclick=()=>{
  $('#modal').classList.remove('on');
  if(over){
    aiMode=false;stopAmbient();
    $('#ai-think').style.display='none';
    if(onlineMode){NET.cleanup();onlineMode=null;updateNetStatus()}
    show('menu');
  }
};
/* برگشت به منو از وسط بازی (محلی / AI / آنلاین) */
function leaveToMenu(){
  aiGen++;aiMode=false;over=true;fx=[];stopAmbient();
  $('#ai-think').style.display='none';
  $('#modal').classList.remove('on');$('#netModal').style.display='none';
  if(onlineMode){const m=onlineMode;onlineMode=null;try{NET.send({t:'bye'})}catch(e){}setTimeout(()=>NET.cleanup(),200)}
  updateNetStatus();show('menu');
}
$('#bMenu').onclick=()=>{
  modal('<b>'+tr('backTitle')+'</b><br>'+(onlineMode?tr('backOnline'):tr('backLocal'))+'<br><br><button class="btn" id="bLeaveYes" style="width:100%;border-color:var(--signal-red);color:var(--signal-red)">'+tr('yesLeave')+'</button>');
  $('#bLeaveYes').onclick=leaveToMenu;
};
/* قفل زوم: جلوگیری از pinch / double-tap zoom در WebView */
['gesturestart','gesturechange','gestureend'].forEach(ev=>document.addEventListener(ev,e=>e.preventDefault(),{passive:false}));
document.addEventListener('touchmove',e=>{if(e.touches.length>1)e.preventDefault()},{passive:false});
document.addEventListener('wheel',e=>{if(e.ctrlKey)e.preventDefault()},{passive:false});
/* موج لمس: با خاموش‌بودن «افکت‌های بصری» یا حرکت کاهش‌یافته نشان داده نمی‌شود */
document.addEventListener('pointerdown',e=>{
 if(S.fx===false||RM)return;
 const b=e.target.closest&&e.target.closest('button');if(!b||b.disabled)return;
 const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height)*2,sp=document.createElement('span');
 sp.className='rip';
 sp.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';
 const bc=getComputedStyle(b).borderTopColor;   /* موج به رنگ حاشیهٔ خود دکمه */
 if(bc&&!/rgba\(0, 0, 0, 0\)|transparent/.test(bc))sp.style.background=bc;
 b.appendChild(sp);setTimeout(()=>sp.remove(),600)},true);
addEventListener('resize',resize);
/* حلقهٔ رندر + شمارندهٔ FPS (گوشهٔ بالا-راست؛ سبز ≥۵۰، کهربایی ≥۳۰، قرمز کمتر) */
setTimeout(pxInit,0);   /* Pixi از همان منو آماده می‌شود (گرم‌کردن شیدرها) */
let _fF=0,_fT=performance.now(),_fShow=false;const _fEl=$('#fps');
(function loop(){const on=$('#game').classList.contains('on');if(on)draw();
 const want=on&&S.fps!==false;
 if(want!==_fShow){_fShow=want;_fEl.style.display=want?'block':'none'}
 if(on){_fF++;const n=performance.now();if(n-_fT>=500){const v=Math.round(_fF*1000/(n-_fT));
   if(want){_fEl.textContent=v+' FPS'+(_q?' · Q'+_q:'');_fEl.style.color=v>=50?C.cyan:v>=30?C.amber:C.red}
   autoQ(v,n);_fF=0;_fT=n}}
 else{_fF=0;_fT=performance.now()}
 requestAnimationFrame(loop)})();
