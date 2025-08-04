import React, { useState, useRef } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Progress } from './progress';
import { Alert, AlertDescription } from './alert';
import { 
  Upload, 
  File, 
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle,
  Download,
  Trash2,
  Table
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  content?: string;
  status: 'uploading' | 'success' | 'error';
  progress?: number;
  file?: File; // Arquivo original para upload posterior
}

interface FileUploadProps {
  agentId?: string;
  userId: string;
  onFilesChange: (files: UploadedFile[]) => void;
  uploadedFiles: UploadedFile[];
  maxFiles?: number;
  maxFileSize?: number; // em bytes
  acceptedTypes?: string[];
}

export function FileUpload({
  agentId,
  userId,
  onFilesChange,
  uploadedFiles,
  maxFiles = 10,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  acceptedTypes = ['.pdf', '.doc', '.docx', '.txt', '.rtf', '.xlsx', '.xls', '.csv']
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <File className="h-4 w-4" />;
    if (type.includes('word') || type.includes('document')) return <FileText className="h-4 w-4" />;
    if (type.includes('excel') || type.includes('xls') || type.includes('xlsx')) return <Table className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const validateFile = (file: File): string | null => {
    if (uploadedFiles.length >= maxFiles) {
      return `Maximum of ${maxFiles} files allowed`;
    }

    if (file.size > maxFileSize) {
      return `File too large. Maximum: ${formatFileSize(maxFileSize)}`;
    }

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      return `File type not supported. Accepted types: ${acceptedTypes.join(', ')}`;
    }

    return null;
  };

  const uploadFile = async (file: File): Promise<UploadedFile> => {
    // Não fazer upload para o storage ainda - apenas armazenar o arquivo temporariamente
    // O upload será feito apenas quando o usuário clicar em "Create Agent"
    
    return {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: '', // URL será preenchida apenas quando fizer upload para o storage
      status: 'success',
      file: file // Armazenar o arquivo original para upload posterior
    };
  };

  const handleFileUpload = async (files: FileList) => {
    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validationError = validateFile(file);

      if (validationError) {
        toast.error(validationError);
        continue;
      }

      // Verificar se o arquivo já existe na lista
      const fileExists = uploadedFiles.some(existingFile => 
        existingFile.name === file.name && 
        existingFile.size === file.size
      );

             if (fileExists) {
         console.log('File already exists in list:', file.name);
         continue;
       }

      const tempFile: UploadedFile = {
        id: Date.now().toString() + i,
        name: file.name,
        size: file.size,
        type: file.type,
        url: '',
        status: 'uploading',
        progress: 0,
        file: file // Armazenar o arquivo original
      };

      // Adicionar apenas o novo arquivo à lista atual
      const currentFilesWithTemp = [...uploadedFiles, tempFile];
      onFilesChange(currentFilesWithTemp);

      try {
        const uploadedFile = await uploadFile(file);
        
        // Atualizar o arquivo na lista
        const updatedFilesList = currentFilesWithTemp.map(f => 
          f.id === tempFile.id ? uploadedFile : f
        );
        
        onFilesChange(updatedFilesList);
        toast.success(`File "${file.name}" attached successfully!`);
      } catch (error) {
        console.error('Erro no upload:', error);
        const updatedFiles = currentFilesWithTemp.filter(f => f.id !== tempFile.id);
        onFilesChange(updatedFiles);
        toast.error(`Error sending "${file.name}": ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    setUploading(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(e.target.files);
    }
  };

  const removeFile = async (fileId: string) => {
    const fileToRemove = uploadedFiles.find(f => f.id === fileId);
    if (!fileToRemove) return;

    try {
      // Se temos um agentId e o arquivo já foi enviado para o storage, remover do banco
      if (agentId && fileToRemove.id !== Date.now().toString() && fileToRemove.url) {
        await supabase
          .from('agent_documents')
          .delete()
          .eq('id', fileToRemove.id);
      }

      // Remover do storage apenas se o arquivo já foi enviado (tem URL)
      if (fileToRemove.url && !fileToRemove.file) {
        const filePath = fileToRemove.url.split('/').slice(-3).join('/');
        await supabase.storage
          .from('agent-documents')
          .remove([filePath]);
      }

      const updatedFiles = uploadedFiles.filter(f => f.id !== fileId);
      onFilesChange(updatedFiles);
             toast.success(`File "${fileToRemove.name}" removed`);
    } catch (error) {
      console.error('Error removing file:', error);
      toast.error(`Error removing "${fileToRemove.name}"`);
    }
  };

  return (
    <div className="space-y-4">
      <Card className={`border-2 border-dashed transition-colors ${
        isDragging 
          ? 'border-pink-500 bg-pink-50' 
          : 'border-gray-300 hover:border-pink-400'
      }`}>
        <CardContent className="p-6">
          <div
            className="flex flex-col items-center justify-center space-y-4"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-8 w-8 text-gray-400" />
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">
                Drag files here or click to select
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Accepted types: {acceptedTypes.join(', ')} | Maximum: {formatFileSize(maxFileSize)}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || uploadedFiles.length >= maxFiles}
            >
              Select Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={acceptedTypes.join(',')}
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">
            Attached Files ({uploadedFiles.length}/{maxFiles})
          </h3>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <Card key={file.id} className="border border-gray-200">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {file.status === 'uploading' && (
                        <div className="flex items-center space-x-2">
                          <Progress value={file.progress || 0} className="w-16" />
                          <span className="text-xs text-gray-500">
                            {file.progress || 0}%
                          </span>
                        </div>
                      )}
                      
                      {file.status === 'success' && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Attached
                        </Badge>
                      )}
                      
                      {file.status === 'error' && (
                        <Badge variant="destructive">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Error
                        </Badge>
                      )}
                      
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

             {uploading && (
         <Alert>
           <AlertCircle className="h-4 w-4" />
                       <AlertDescription>
              Attaching files... Please wait.
            </AlertDescription>
         </Alert>
       )}
    </div>
  );
} 