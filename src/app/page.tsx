"use client";

import { useState } from "react";
import {
  ArrowRight,
  BarChart2,
  Lock,
  TrendingUp,
  Menu,
  Upload,
  X,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      } else {
        throw new Error("No file selected");
      }

      const response = await fetch("http://127.0.0.1:8080/api/upload-csv/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      localStorage.setItem("data", JSON.stringify(data));

      router.push("/info");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Informacion CSV:", selectedFile);

    if (selectedFile) {
      console.log("Existe un csv");

      const response = await fetchData();
    }

    e.preventDefault();
    toast({
      title: "Successfully subscribed!",
      description: "Thank you for joining our newsletter.",
      duration: 3000,
    });
    setEmail("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setSelectedFile(file);
    } else {
      alert("Please upload a CSV file");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-900 via-gray-900 to-black text-white overflow-x-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0')] bg-cover bg-center opacity-10"></div>

      <div className="relative w-full">
        <header className="w-full px-4 py-6 border-b border-gray-800">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                Cryptoforence
              </span>
            </div>

            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                {["Caracteristicas", "Como funciona?", "Contactanos"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase().replace(" ", "-")}`}
                        className="hover:text-green-400 transition-colors text-sm font-medium"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </nav>

            {/* <Button
              variant="outline"
              className="hidden md:inline-flex border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
            >
              Launch App
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button> */}

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="mt-4 md:hidden max-w-7xl mx-auto">
              <ul className="flex flex-col space-y-4">
                {["Features", "How It Works", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="block py-2 hover:text-green-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <Button
                    variant="outline"
                    className="w-full border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                  >
                    Launch App
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </li>
              </ul>
            </nav>
          )}
        </header>

        <main className="w-full">
          <section className="max-w-7xl mx-auto px-4 py-24 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                Descubre las tendencias cripto del mercado
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Cargue sus datos CSV y visualice al instante la informacion de
                la criptodivisa. Tome decisiones informadas y maximice sus
                ganancias.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="relative w-full sm:w-auto">
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-base font-medium rounded-md bg-green-500 hover:bg-green-600 text-white cursor-pointer transition-colors"
                  >
                    {selectedFile ? selectedFile.name : "Cargar archivo CSV"}{" "}
                  </label>
                </div>
                <Button
                  variant="outline"
                  className="w-full h-full sm:w-auto px-6 py-3 text-base font-medium rounded-md border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                  onClick={handleSubmit}
                >
                  Enviar
                </Button>
              </div>
            </div>
          </section>

          <section
            id="features"
            className="max-w-7xl mx-auto px-4 py-24 relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 to-transparent"></div>
            <h2 className="text-3xl font-bold mb-16 text-center">
              Potentes funciones para el criptoanálisis
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: BarChart2,
                  title: "Análisis avanzados",
                  description:
                    "Potente análisis de correlaciones para identificar tendencias y oportunidades de mercado.",
                },
                {
                  icon: Lock,
                  title: "Tratamiento seguro de datos",
                  description:
                    "Sus datos se procesan de forma segura y nunca se almacenan en nuestros servidores.",
                },
                {
                  icon: TrendingUp,
                  title: "Información en tiempo real",
                  description:
                    "Obtenga visualizaciones instantáneas de las tendencias y correlaciones del mercado.",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 text-green-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section id="how-it-works" className="max-w-7xl mx-auto px-4 py-24">
            <h2 className="text-3xl font-bold mb-16 text-center">
              Como funciona?
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
              {[
                {
                  step: 1,
                  title: "Carga tu CSV",
                  description:
                    " Cargue sus datos de criptomoneda en formato CSV.",
                },
                {
                  step: 2,
                  title: "Procesamiento de datos",
                  description:
                    "Nuestro sistema calcula la informacion y retorna la correlacion de las criptodivisas.",
                },
                {
                  step: 3,
                  title: "Visualizar los resultados",
                  description:
                    "Explore el mapa interactivo de correlaciones entre criptomonedas.",
                },
              ].map((item, index) => (
                <div key={index} className="text-center relative group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* <section id="contact" className="max-w-7xl mx-auto px-4 py-24">
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm max-w-md mx-auto">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Stay Updated
                </h2>
                <p className="text-gray-400 mb-6 text-center">
                  Get notified about new features and crypto market insights.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-800/50 border-gray-700"
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    Subscribe
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section> */}
        </main>

        <footer className="w-full border-t border-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              {[
                {
                  title: "Empresa JADE",
                  links: ["Acerca de"],
                },
                {
                  title: "Recursos",
                  links: ["Blog", "Documentacion"],
                },
                {
                  title: "Legal",
                  links: [
                    "Politica de privacidad",
                    "Terminos del servicio",
                    "Politicas de cookies",
                  ],
                },
                {
                  title: "Contactanos",
                  links: ["LinkedIn"],
                },
              ].map((section) => (
                <div key={section.title}>
                  <h3 className="font-semibold mb-4 text-gray-300">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <Separator className="mb-8 bg-gray-800" />

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                &copy; 2024 Cryptoforence. All rights reserved.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
