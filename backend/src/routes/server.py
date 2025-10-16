from flask import Blueprint, request, jsonify
from src.models.server import db, Server, Metric
import psutil
import random
from datetime import datetime

server_bp = Blueprint('server', __name__)


@server_bp.route('/servers', methods=['GET'])
def get_servers():
    """获取所有服务器列表"""
    try:
        servers = Server.query.all()
        return jsonify({
            'success': True,
            'data': [server.to_dict() for server in servers]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@server_bp.route('/servers', methods=['POST'])
def create_server():
    """创建新服务器"""
    try:
        data = request.get_json()
        
        server = Server(
            name=data.get('name'),
            host=data.get('host'),
            port=data.get('port', 22),
            server_type=data.get('type', 'linux'),
            auth_type=data.get('auth_type', 'password'),
            username=data.get('username'),
            password=data.get('password'),
            private_key=data.get('private_key'),
            status='offline'
        )
        
        db.session.add(server)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': server.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@server_bp.route('/servers/<int:server_id>', methods=['GET'])
def get_server(server_id):
    """获取单个服务器详情"""
    try:
        server = Server.query.get_or_404(server_id)
        return jsonify({
            'success': True,
            'data': server.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 404


@server_bp.route('/servers/<int:server_id>', methods=['PUT'])
def update_server(server_id):
    """更新服务器信息"""
    try:
        server = Server.query.get_or_404(server_id)
        data = request.get_json()
        
        if 'name' in data:
            server.name = data['name']
        if 'host' in data:
            server.host = data['host']
        if 'port' in data:
            server.port = data['port']
        if 'type' in data:
            server.server_type = data['type']
        if 'status' in data:
            server.status = data['status']
            
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': server.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@server_bp.route('/servers/<int:server_id>', methods=['DELETE'])
def delete_server(server_id):
    """删除服务器"""
    try:
        server = Server.query.get_or_404(server_id)
        db.session.delete(server)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Server deleted successfully'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@server_bp.route('/servers/<int:server_id>/metrics', methods=['GET'])
def get_server_metrics(server_id):
    """获取服务器实时指标"""
    try:
        server = Server.query.get_or_404(server_id)
        
        # 模拟获取服务器指标（实际应该通过SSH连接获取）
        # 这里使用本地系统指标作为示例
        if server.status == 'online':
            cpu_percent = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            disk = psutil.disk_usage('/')
            network = psutil.net_io_counters()
            
            # 创建新的指标记录
            metric = Metric(
                server_id=server_id,
                cpu_usage=cpu_percent,
                memory_usage=memory.percent,
                disk_usage=disk.percent,
                network_in=network.bytes_recv / (1024 * 1024),  # Convert to MB
                network_out=network.bytes_sent / (1024 * 1024)
            )
            db.session.add(metric)
            db.session.commit()
            
            return jsonify({
                'success': True,
                'data': {
                    'cpu': round(cpu_percent, 1),
                    'memory': round(memory.percent, 1),
                    'disk': round(disk.percent, 1),
                    'network': round(random.uniform(0.5, 3.0), 1)
                }
            }), 200
        else:
            return jsonify({
                'success': True,
                'data': {
                    'cpu': 0,
                    'memory': 0,
                    'disk': 0,
                    'network': 0
                }
            }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@server_bp.route('/servers/<int:server_id>/metrics/history', methods=['GET'])
def get_server_metrics_history(server_id):
    """获取服务器历史指标"""
    try:
        server = Server.query.get_or_404(server_id)
        limit = request.args.get('limit', 100, type=int)
        
        metrics = Metric.query.filter_by(server_id=server_id)\
            .order_by(Metric.timestamp.desc())\
            .limit(limit)\
            .all()
        
        return jsonify({
            'success': True,
            'data': [metric.to_dict() for metric in metrics]
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@server_bp.route('/servers/<int:server_id>/execute', methods=['POST'])
def execute_command(server_id):
    """在服务器上执行命令"""
    try:
        server = Server.query.get_or_404(server_id)
        data = request.get_json()
        command = data.get('command')
        
        if not command:
            return jsonify({
                'success': False,
                'error': 'Command is required'
            }), 400
        
        # 这里应该通过SSH连接执行命令
        # 为了演示，返回模拟结果
        result = f"Command '{command}' executed successfully on {server.name}"
        
        return jsonify({
            'success': True,
            'data': {
                'output': result,
                'exit_code': 0
            }
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@server_bp.route('/servers/<int:server_id>/connect', methods=['POST'])
def test_connection(server_id):
    """测试服务器连接"""
    try:
        server = Server.query.get_or_404(server_id)
        
        # 这里应该实际测试SSH连接
        # 为了演示，随机返回成功或失败
        success = random.choice([True, True, True, False])
        
        if success:
            server.status = 'online'
            db.session.commit()
            
            return jsonify({
                'success': True,
                'message': 'Connection successful'
            }), 200
        else:
            server.status = 'error'
            db.session.commit()
            
            return jsonify({
                'success': False,
                'error': 'Connection failed'
            }), 500
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@server_bp.route('/overview', methods=['GET'])
def get_overview():
    """获取系统概览统计"""
    try:
        total_servers = Server.query.count()
        online_servers = Server.query.filter_by(status='online').count()
        offline_servers = Server.query.filter_by(status='offline').count()
        
        # 获取所有在线服务器的平均指标
        online_server_ids = [s.id for s in Server.query.filter_by(status='online').all()]
        
        if online_server_ids:
            recent_metrics = []
            for server_id in online_server_ids:
                metric = Metric.query.filter_by(server_id=server_id)\
                    .order_by(Metric.timestamp.desc())\
                    .first()
                if metric:
                    recent_metrics.append(metric)
            
            if recent_metrics:
                avg_cpu = sum(m.cpu_usage for m in recent_metrics) / len(recent_metrics)
                avg_memory = sum(m.memory_usage for m in recent_metrics) / len(recent_metrics)
                avg_network = sum(m.network_in + m.network_out for m in recent_metrics) / len(recent_metrics)
            else:
                avg_cpu = avg_memory = avg_network = 0
        else:
            avg_cpu = avg_memory = avg_network = 0
        
        return jsonify({
            'success': True,
            'data': {
                'total_servers': total_servers,
                'online_servers': online_servers,
                'offline_servers': offline_servers,
                'avg_cpu': round(avg_cpu, 1),
                'avg_memory': round(avg_memory, 1),
                'avg_network': round(avg_network, 2)
            }
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

