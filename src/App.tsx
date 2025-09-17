import React, { useState } from 'react';
import { Send, User, Phone, MapPin, Calendar } from 'lucide-react';
import logo from './assets/BLACK_YELLOW_HORIZONTAL.png'

interface FormData {
  nome: string;
  telefone: string;
  Rua: string;
  Numero: string;
  Bairro: string;
  Cidade: string;
  cep: string;
  Estado: string;
  DataNascimento: string;
  FrequentaIgreja: boolean;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    telefone: '',
    Rua: '',
    Numero: '',
    Bairro: '',
    Cidade: '',
    cep: '',
    Estado: '',
    DataNascimento: '',
    FrequentaIgreja: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    // Aplicar máscara para data de nascimento
    if (name === 'DataNascimento') {
      const maskedValue = applyDateMask(value);
      setFormData(prev => ({
        ...prev,
        [name]: maskedValue
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://automacao.igrejafamilia.net.br/webhook/boas-vindas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Cadastro realizado com sucesso! Seja bem-vindo(a)!');
        setFormData({
          nome: '',
          telefone: '',
          Rua: '',
          Numero: '',
          Bairro: '',
          Cidade: '',
          cep: '',
          Estado: '',
          DataNascimento: '',
          FrequentaIgreja: false,
        });
      } else {
        throw new Error('Erro ao enviar dados');
      }
    } catch (error) {
      setMessage('Erro ao enviar cadastro. Tente novamente.');
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyDateMask = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara dd/mm/yyyy
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    }
  };

  return (
    <div className="min-h-screen min-w-full bg-white">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Logo da Igreja */}
        <div className="flex flex-col items-center text-center mb-8">
          <img src={logo} alt="Igreja Familia" className='w-42' />
          <p className="text-gray-900 text-lg font-bold mt-6">Cadastro Boas Vindas</p>
        </div>

        {/* Mensagem de Status */}
        {message && (
          <div className={`mb-4 p-4 rounded-lg text-center ${
            message.includes('sucesso') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Nome */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 mr-2 text-yellow-500" />
              Nome Completo
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
              placeholder="Digite seu nome completo"
            />
          </div>

          {/* Celular */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 mr-2 text-yellow-500" />
              Celular
            </label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
              placeholder="(11) 99999-9999"
            />
          </div>

          {/* Endereço */}
          <div className="space-y-4">
            <h3 className="flex items-center text-sm font-medium text-gray-700">
              <MapPin className="w-4 h-4 mr-2 text-yellow-500" />
              Endereço
            </h3>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <input
                  type="text"
                  name="Rua"
                  value={formData.Rua}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                  placeholder="Rua"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="Numero"
                  value={formData.Numero}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                  placeholder="Nº"
                />
              </div>
            </div>

            <input
              type="text"
              name="Bairro"
              value={formData.Bairro}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
              placeholder="Bairro"
            />

            <input
              type="number"
              name="cep"
              value={formData.cep}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
              placeholder="CEP"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="Cidade"
                value={formData.Cidade}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                placeholder="Cidade"
              />
              <input
                type="text"
                name="Estado"
                value={formData.Estado}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                placeholder="Estado"
              />
            </div>
          </div>

          {/* Data de Nascimento */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 mr-2 text-yellow-500" />
              Data de Nascimento
            </label>
            <input
              type="text"
              name="DataNascimento"
              value={formData.DataNascimento}
              onChange={handleInputChange}
              placeholder="dd/mm/aaaa"
              pattern="\d{2}/\d{2}/\d{4}"
              maxLength={10}
              required
              className="w-full px-4 py-3 border text-zinc-900 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
            />
          </div>

          {/* Checkbox Igreja */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="FrequentaIgreja"
                checked={formData.FrequentaIgreja}
                onChange={handleInputChange}
                className="mt-1 w-5 h-5 text-yellow-500 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                Você frequenta uma Igreja Evangélica?
              </span>
            </label>
          </div>

          {/* Botão Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white font-medium py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2 mt-6"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Fazer Cadastro</span>
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 text-xs text-gray-500">
          <p>Seus dados são tratados com total segurança e privacidade</p>
        </div>
      </div>
    </div>
  );
}

export default App;